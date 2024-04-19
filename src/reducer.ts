import { Codes } from "./const"
import { Currencies, SetAmountAction } from "./types"

export const reducer = (state: Currencies, action: SetAmountAction) => {
  switch (action.type) {
    case "SET_AMOUNT":
      return Codes.reduce(
        (acc, code) => ({
          ...acc,
          [code]: {
            ...state[code],
            amount:
              code === action.payload.code
                ? action.payload.amount
                : state[code].amount,
            isLoading:
              code === action.payload.code
                ? state[code].isLoading
                : action.payload.isLoading,
          },
        }),
        state
      )
    default:
      return state
  }
}
