import type { Codes } from "./const"

export type Code = (typeof Codes)[number]

export type Currency = {
  code: Code
  symbol: string
  amount: number | null
  isLoading: boolean
}

export type Currencies = {
  [K in Code]: Currency
}

export type SetAmountAction = {
  type: string
  payload: {
    code: Code
    amount: number | null
    isLoading: boolean
  }
}

export type RequestRateProps = {
  amount: number
  from: Code
  dispatch: (action: SetAmountAction) => void
}

export type CurrencyConversionResponse = {
  success: boolean
  query: CurrencyQuery
  info: ConversionInfo
  historical: boolean
  date: string
  timestamp: number
  result: number
}

type CurrencyQuery = {
  from: string
  to: string
  amount: number
}

type ConversionInfo = {
  rate: number
}
