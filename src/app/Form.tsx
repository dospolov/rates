"use client"

import { useReducer } from "react"
import Amount from "./Amount"
import { initialState } from "@/const"
import { reducer } from "./reducer"
import type { Currency } from "@/types"

function Form() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <div className="px-6 mx-auto w-full space-y-[clamp(0.5rem,2svh,1rem)] max-w-xl">
        {/* symbols taken from */}
        {/* https://gist.github.com/Gibbs/3920259 */}
        {Object.values(state).map(
          ({ code, symbol, amount, isLoading }: Currency) => (
            <Amount
              key={code}
              code={code}
              symbol={symbol}
              amount={amount}
              isLoading={isLoading}
              dispatch={dispatch}
            />
          ),
        )}
      </div>
      <div className="self-end px-6 py-4 mx-auto w-full max-w-xl text-slate-700 space-y-1">
        <p>App version: 0.16</p>
        <p>
          Rates provided by: <a href="https://fxratesapi.com/">FXRatesAPI</a>
        </p>
      </div>
    </>
  )
}

export default Form
