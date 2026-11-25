import { useMemo } from "react"
import debounce from "lodash.debounce"
import { XIcon } from "lucide-react"
import type { Code, Currency, Action } from "@/types"
import { requestRates } from "@/lib/utils"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

export default function Amount({
  code,
  symbol,
  amount,
  isLoading,
  codes,
  dispatch,
  onRemove,
}: Currency & {
  codes: Code[]
  dispatch: (action: Action) => void
  onRemove?: () => void
}) {
  const requestRatesDebounced = useMemo(() => debounce(requestRates, 1000), [])

  return (
    <InputGroup className="h-[clamp(2.5rem,9svh,4rem)]">
      <InputGroupInput
        type="text"
        name={`price-${code}`}
        id={`price-${code}`}
        value={amount ?? ""}
        placeholder="0"
        aria-describedby={`currency-${code}`}
        disabled={isLoading}
        onChange={(e) => {
          if (e.target.value.length > 8) {
            return
          }

          const floatAmount = parseInt(e.target.value, 10)
          if (floatAmount !== amount) {
            const newAmount =
              e.target.value && !isNaN(floatAmount) ? floatAmount : null
            dispatch({
              type: "SET_AMOUNT",
              payload: { code, amount: newAmount, isLoading: true },
            })
            if (newAmount && !isNaN(floatAmount))
              requestRatesDebounced({
                amount: newAmount,
                from: code,
                to: codes,
                dispatch,
              })
          }
        }}
        onFocus={(e) => e.target.select()}
      />
      <InputGroupAddon>{symbol}</InputGroupAddon>
      <InputGroupAddon align="inline-end" id={`currency-${code}`}>
        {code}
        {onRemove && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            aria-label={`Remove ${code}`}
            onClick={onRemove}
          >
            <XIcon />
          </InputGroupButton>
        )}
      </InputGroupAddon>
    </InputGroup>
  )
}
