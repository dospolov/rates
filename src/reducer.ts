import { Codes } from "./const"
import { Currencies, SetAmountAction } from "./types"

function generateRandom(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export const reducer = (state: Currencies, action: SetAmountAction) => {
  switch (action.type) {
    case "SET_AMOUNT":
      return {
        ...state,
        [action.payload.code]: {
          ...state[action.payload.code],
          amount: action.payload.amount,
        },
      }
    default:
      return state
  }
}
