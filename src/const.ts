import { Currencies } from "./types"

export const Codes = ["PLN", "EUR", "USD"] as const

export const initialState: Currencies = {
  PLN: {
    code: "PLN",
    symbol: "zł",
    amount: null,
  },
  USD: {
    code: "USD",
    symbol: "$",
    amount: null,
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    amount: null,
  },
  // UAH: {
  //   code: "UAH",
  //   symbol: "₴",
  //   amount: 0,
  // },
}
