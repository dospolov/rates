import { Codes } from "@/const"
import type { Currencies, SetAmountAction, Code } from "@/types"

export const reducer = (
  state: Currencies,
  action: SetAmountAction,
): Currencies => {
  switch (action.type) {
    case "SET_AMOUNT":
      return Codes.reduce(
        (acc: Currencies, code: Code) => ({
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
        state,
      )
    default:
      return state
  }
}
