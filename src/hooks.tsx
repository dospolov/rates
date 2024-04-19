import { useState, useEffect } from "react"
import { Currencies } from "./types"

export function useDebounce(value: Currencies, delay: number): Currencies {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
