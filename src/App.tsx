import { useEffect, useReducer } from "react"
import "./App.css"
import Input from "./Input"
import { useDebounce } from "./hooks"
import { initialState } from "./const"
import { reducer } from "./reducer"

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const debouncedInput = useDebounce(state, 500)

  useEffect(() => {
    if (debouncedInput) {
      console.log(debouncedInput)
    }
  }, [debouncedInput])

  return (
    <div className="p-6 mx-auto max-w-96">
      {/* symbols taken from */}
      {/* https://gist.github.com/Gibbs/3920259 */}
      {Object.values(state).map(({ code, symbol, amount }) => (
        <Input
          key={code}
          code={code}
          symbol={symbol}
          amount={amount}
          dispatch={dispatch}
        />
      ))}
    </div>
  )
}

export default App
