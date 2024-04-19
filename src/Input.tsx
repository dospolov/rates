import { useMemo } from "react"
import debounce from "lodash.debounce"
import { Currency, SetAmountAction } from "./types"
import { requestRates } from "./utils"

export default function Input({
  code,
  symbol,
  amount,
  isLoading,
  dispatch,
}: Currency & {
  dispatch: (action: SetAmountAction) => void
}) {
  const requestRatesDebounced = useMemo(() => debounce(requestRates, 1000), [])

  return (
    <div>
      <div className="relative rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 text-lg">{symbol}</span>
        </div>
        <input
          type="text"
          name="price"
          id="price"
          value={amount ?? ""}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-5 pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:cursor-not-allowed disabled:border-gray-900 disabled:bg-gray-800 disabled:text-gray-500 disabled:ring-gray-900 text-xl"
          placeholder="0"
          aria-describedby="price-currency"
          disabled={isLoading}
          onChange={(e) => {
            if (e.target.value.length > 8) {
              return
            }

            const floatAmount = parseInt(e.target.value, 10)
            if (floatAmount !== amount) {
              const newAmount =
                e.target.value && !isNaN(floatAmount) ? floatAmount : null
              const action = {
                type: "SET_AMOUNT",
                payload: { code, amount: newAmount, isLoading: true },
              }
              dispatch(action)
              if (newAmount && !isNaN(floatAmount))
                requestRatesDebounced({
                  amount: newAmount,
                  from: code,
                  dispatch,
                })
            }
          }}
          onFocus={(e) => e.target.select()}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-gray-500 text-lg" id="price-currency">
            {code}
          </span>
        </div>
      </div>
    </div>
  )
}
