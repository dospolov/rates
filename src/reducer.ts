import { Codes } from "./const"
import { Currencies, SetAmountAction } from "./types"

function generateRandom(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export const reducer = (state: Currencies, action: SetAmountAction) => {
  switch (action.type) {
    case "SET_AMOUNT":
      return Codes.reduce((acc, code) => {
        return {
          ...acc,
          [code]: {
            ...state[code],
            amount:
              code === action.payload.code
                ? action.payload.amount
                : action.payload.amount
                ? Math.ceil(action.payload.amount * generateRandom(0.1, 9.0))
                : null,
          },
        }
      }, state)
    default:
      return state
  }
}
