import type { Code, Currencies } from "./types"

export const DEFAULT_CODES: Code[] = ["USD", "EUR", "UAH"]

export const ALL_CODES: Code[] = Intl.supportedValuesOf("currency")

const currencyNames = new Intl.DisplayNames(["en"], { type: "currency" })

export function nameOf(code: Code): string {
  try {
    return currencyNames.of(code) ?? code
  } catch {
    return code
  }
}

export function symbolOf(code: Code): string {
  try {
    const parts = new Intl.NumberFormat("en", {
      style: "currency",
      currency: code,
      currencyDisplay: "narrowSymbol",
    }).formatToParts(0)
    return parts.find((p) => p.type === "currency")?.value ?? code
  } catch {
    return code
  }
}

export function makeState(codes: Code[]): Currencies {
  return codes.reduce((acc: Currencies, code: Code) => {
    acc[code] = {
      code,
      symbol: symbolOf(code),
      amount: null,
      isLoading: false,
    }
    return acc
  }, {})
}

export function loadCodes(raw: string | null): Code[] {
  const known = new Set(ALL_CODES)
  const seen = new Set(DEFAULT_CODES)
  const codes: Code[] = [...DEFAULT_CODES]

  if (raw) {
    try {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        for (const code of parsed) {
          if (typeof code === "string" && known.has(code) && !seen.has(code)) {
            seen.add(code)
            codes.push(code)
          }
        }
      }
    } catch {
      // malformed storage, fall back to defaults
    }
  }

  return codes
}
