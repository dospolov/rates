import { Codes } from "./const"

export type Code = (typeof Codes)[number]

export type Currency = {
  code: Code
  symbol: string
  amount: number | null
}

export type Currencies = {
  [K in Code]: Currency
}

export type SetAmountAction = {
  type: string
  payload: {
    code: Code
    amount: number | null
  }
}
