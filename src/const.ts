import type { Currencies } from "./types"

export const Codes = ["PLN", "EUR", "USD", "UAH"] as const

export const initialState: Currencies = {
  PLN: {
    code: "PLN",
    symbol: "zł",
    amount: null,
    isLoading: false,
  },
  USD: {
    code: "USD",
    symbol: "$",
    amount: null,
    isLoading: false,
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    amount: null,
    isLoading: false,
  },
  UAH: {
    code: "UAH",
    symbol: "₴",
    amount: 0,
    isLoading: false,
  },
}
