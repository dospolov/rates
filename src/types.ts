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

export type CurrencyConversionResponse = {
  success: boolean
  query: CurrencyQuery
  info: ConversionInfo
  historical: boolean
  date: string
  timestamp: number
  result: number
}

// Query details for the currency conversion
type CurrencyQuery = {
  from: string
  to: string
  amount: number
}

// Information about the conversion rate
type ConversionInfo = {
  rate: number
}
