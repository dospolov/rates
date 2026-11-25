export type Code = string

export type Currency = {
  code: Code
  symbol: string
  amount: number | null
  isLoading: boolean
}

export type Currencies = Record<Code, Currency>

export type SetAmountAction = {
  type: "SET_AMOUNT"
  payload: {
    code: Code
    amount: number | null
    isLoading: boolean
  }
}

export type AddCurrencyAction = {
  type: "ADD_CURRENCY"
  payload: { code: Code }
}

export type RemoveCurrencyAction = {
  type: "REMOVE_CURRENCY"
  payload: { code: Code }
}

export type SetCodesAction = {
  type: "SET_CODES"
  payload: { codes: Code[] }
}

export type Action =
  | SetAmountAction
  | AddCurrencyAction
  | RemoveCurrencyAction
  | SetCodesAction

export type RequestRateProps = {
  amount: number
  from: Code
  to: Code[]
  dispatch: (action: Action) => void
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
