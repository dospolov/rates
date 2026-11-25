import { DEFAULT_CODES, makeState, symbolOf } from "@/const"
import type { Currencies, Action, Code } from "@/types"

export const reducer = (state: Currencies, action: Action): Currencies => {
  switch (action.type) {
    case "SET_AMOUNT":
      return Object.keys(state).reduce(
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
    case "ADD_CURRENCY": {
      const { code } = action.payload
      if (state[code]) return state
      return {
        ...state,
        [code]: {
          code,
          symbol: symbolOf(code),
          amount: null,
          isLoading: false,
        },
      }
    }
    case "REMOVE_CURRENCY": {
      const { code } = action.payload
      if (DEFAULT_CODES.includes(code) || !state[code]) return state
      const { [code]: _removed, ...rest } = state
      return rest
    }
    case "SET_CODES":
      return makeState(action.payload.codes)
    default:
      return state
  }
}
