// Run: node src/lib/codes.check.ts  (Node strips the types)
import assert from "node:assert/strict"
import { DEFAULT_CODES, loadCodes } from "../const.ts"

const startsWithDefaults = (codes: string[]) =>
  DEFAULT_CODES.every((code, i) => codes[i] === code)

// null / missing storage -> just the defaults
assert.deepEqual(loadCodes(null), DEFAULT_CODES)

// garbage JSON -> defaults, no throw
assert.deepEqual(loadCodes("not json"), DEFAULT_CODES)

// non-array JSON -> defaults
assert.deepEqual(loadCodes('{"foo":1}'), DEFAULT_CODES)

// unknown / non-string codes are dropped, defaults preserved
assert.deepEqual(loadCodes(JSON.stringify(["ZZZ", 42, null, "PLN"])), [
  ...DEFAULT_CODES,
  "PLN",
])

// duplicates (incl. a default repeated) are de-duped, order kept
const deduped = loadCodes(JSON.stringify(["PLN", "PLN", "USD", "THB"]))
assert.deepEqual(deduped, [...DEFAULT_CODES, "PLN", "THB"])
assert.equal(new Set(deduped).size, deduped.length)

// result always starts with the defaults
assert.ok(startsWithDefaults(loadCodes(JSON.stringify(["GEL"]))))
assert.ok(startsWithDefaults(loadCodes(null)))

console.log("codes.check.ts: all assertions passed")
