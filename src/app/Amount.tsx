import { useMemo } from "react"
import debounce from "lodash.debounce"
import type { Currency, SetAmountAction } from "@/types"
import { requestRates } from "@/lib/utils"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export default function Amount({
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
    <InputGroup>
      <InputGroupInput
        type="text"
        name="price"
        id="price"
        value={amount ?? ""}
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
      <InputGroupAddon>{symbol}</InputGroupAddon>
      <InputGroupAddon align="inline-end">{code}</InputGroupAddon>
    </InputGroup>
  )
}
