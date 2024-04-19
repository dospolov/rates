import { useReducer, useEffect } from "react"
import Input from "./Input"
import { initialState } from "./const"
import { reducer } from "./reducer"
import { getFromUrl } from "./utils"
import "./App.css"

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getFromUrl({ dispatch })
  }, [])

  return (
    <div className="p-6 mx-auto max-w-96">
      {/* symbols taken from */}
      {/* https://gist.github.com/Gibbs/3920259 */}
      {Object.values(state).map(({ code, symbol, amount, isLoading }) => (
        <Input
          key={code}
          code={code}
          symbol={symbol}
          amount={amount}
          isLoading={isLoading}
          dispatch={dispatch}
        />
      ))}
    </div>
  )
}

export default App
