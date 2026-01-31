import { Codes } from "@/const"
import type { Currencies, SetAmountAction } from "@/types"

export const reducer = (state: Currencies, action: SetAmountAction) => {
  switch (action.type) {
    case "SET_AMOUNT":
      return Codes.reduce<Currencies>((acc, code) => {
        acc[code] = {
          ...state[code],
          amount:
            code === action.payload.code
              ? action.payload.amount
              : state[code].amount,
          isLoading:
            code === action.payload.code
              ? state[code].isLoading
              : action.payload.isLoading,
        }
        return acc
      }, {} as Currencies)
    default:
      return state
  }
}
