import { Codes } from "./const"
import getRates from "./api/getRates"
import { Code, RequestRateProps } from "./types"

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
        payload: { code, amount: Math.floor(response.result) },
      })
    })
  })
}
