"use client"

import { useReducer, useEffect } from "react"
import Amount from "./Amount"
import { initialState } from "@/const"
import { reducer } from "./reducer"
import { getFromUrl } from "@/lib/utils"

function Form() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getFromUrl({ dispatch })
  }, [])

  return (
    <div className="h-[100svh] flex items-center">
      <div className="p-6 mx-auto w-full space-y-4 max-w-xl">
        {/* symbols taken from */}
        {/* https://gist.github.com/Gibbs/3920259 */}
        {Object.values(state).map(({ code, symbol, amount, isLoading }) => (
          <Amount
            key={code}
            code={code}
            symbol={symbol}
            amount={amount}
            isLoading={isLoading}
            dispatch={dispatch}
          />
        ))}
        <div className="text-slate-700 space-y-1">
          <p>App version: 0.16</p>
          <p>
            Rates provided by: <a href="https://fxratesapi.com/">FXRatesAPI</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Form
