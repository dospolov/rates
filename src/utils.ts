import { Codes } from "./const"
import getRates from "./api/getRates"
import { Code, RequestRateProps, SetAmountAction } from "./types"

export function requestRates({ from, amount, dispatch }: RequestRateProps) {
  const codes = Codes.filter((code) => code !== from)

  Promise.all(
    codes.map((code) => {
      return getRates({ from, amount, to: code })
    })
  ).then((responses) => {
    responses.forEach((response, index) => {
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
  dispatch: (action: SetAmountAction) => void
}) {
  const query = new URLSearchParams(window.location.search)

  const requestInitialRates = (code: Code, amount: number) => {
    dispatch({ type: "SET_AMOUNT", payload: { code, amount, isLoading: true } })
    requestRates({ from: code, amount, dispatch })
  }

  const PLN = query.get("PLN")
  if (PLN) requestInitialRates("PLN", Number(PLN))
  const USD = query.get("USD")
  if (USD) requestInitialRates("USD", Number(USD))
  const EUR = query.get("EUR")
  if (EUR) requestInitialRates("EUR", Number(EUR))
  const UAH = query.get("UAH")
  if (UAH) requestInitialRates("UAH", Number(UAH))

  window.history.pushState({}, "", window.location.pathname)
}
