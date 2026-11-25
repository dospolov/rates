import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import getRates from "@/app/api/getRates"
import type {
  Code,
  CurrencyConversionResponse,
  RequestRateProps,
  Action,
} from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function requestRates({ from, amount, to, dispatch }: RequestRateProps) {
  const codes = to.filter((code) => code !== from)

  Promise.all(
    codes.map((code) => {
      return getRates({ from, amount, to: code })
    }),
  ).then((responses) => {
    responses.forEach((response: CurrencyConversionResponse, index: number) => {
      const code = codes.at(index) as Code
      dispatch({
        type: "SET_AMOUNT",
        payload: {
          code,
          amount: Math.floor(response.result),
          isLoading: false,
        },
      })
    })
  })
}

export function getFromUrl({
  dispatch,
}: {
  dispatch: (action: Action) => void
}) {
  const query = new URLSearchParams(window.location.search)
  const all: Code[] = ["PLN", "USD", "EUR", "UAH", "GEL", "THB"]

  const requestInitialRates = (code: Code, amount: number) => {
    dispatch({ type: "SET_AMOUNT", payload: { code, amount, isLoading: true } })
    requestRates({ from: code, amount, to: all, dispatch })
  }

  for (const code of all) {
    const value = query.get(code)
    if (value) requestInitialRates(code, Number(value))
  }

  window.history.pushState({}, "", window.location.pathname)
}
