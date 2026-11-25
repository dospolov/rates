"use client"

import { useEffect, useMemo, useReducer, useState } from "react"
import Amount from "./Amount"
import { reducer } from "./reducer"
import { requestRates } from "@/lib/utils"
import {
  ALL_CODES,
  DEFAULT_CODES,
  loadCodes,
  makeState,
  nameOf,
  symbolOf,
} from "@/const"
import type { Code, Currency } from "@/types"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const STORAGE_KEY = "codes"

type Option = { value: Code; label: string }

function Form() {
  const [state, dispatch] = useReducer(reducer, makeState(DEFAULT_CODES))
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    dispatch({
      type: "SET_CODES",
      payload: { codes: loadCodes(localStorage.getItem(STORAGE_KEY)) },
    })
  }, [])

  const codes = Object.keys(state)

  const options = useMemo<Option[]>(() => {
    const present = new Set(codes)
    return ALL_CODES.filter((code) => !present.has(code)).map((code) => ({
      value: code,
      label: `${code} ${symbolOf(code)} - ${nameOf(code)}`,
    }))
  }, [codes])

  const handleAdd = (code: Code) => {
    if (state[code]) return
    dispatch({ type: "ADD_CURRENCY", payload: { code } })
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...codes, code]))
    setInputValue("")

    const source = Object.values(state).find((c) => c.amount != null)
    if (source?.amount != null) {
      requestRates({
        from: source.code,
        amount: source.amount,
        to: [code],
        dispatch,
      })
    }
  }

  const handleRemove = (code: Code) => {
    dispatch({ type: "REMOVE_CURRENCY", payload: { code } })
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(codes.filter((c) => c !== code)),
    )
  }

  return (
    <>
      <div className="px-6 mx-auto w-full space-y-[clamp(0.5rem,2svh,1rem)] max-w-xl">
        {Object.values(state).map(
          ({ code, symbol, amount, isLoading }: Currency) => (
            <Amount
              key={code}
              code={code}
              symbol={symbol}
              amount={amount}
              isLoading={isLoading}
              codes={codes}
              dispatch={dispatch}
              onRemove={
                DEFAULT_CODES.includes(code)
                  ? undefined
                  : () => handleRemove(code)
              }
            />
          ),
        )}
        <Combobox
          items={options}
          value={null}
          onValueChange={(item: Option | null) => {
            if (item) handleAdd(item.value)
          }}
          inputValue={inputValue}
          onInputValueChange={setInputValue}
        >
          <ComboboxInput placeholder="Add currency" />
          <ComboboxContent>
            <ComboboxEmpty>No currency found.</ComboboxEmpty>
            <ComboboxList>
              {(item: Option) => (
                <ComboboxItem key={item.value} value={item}>
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
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
