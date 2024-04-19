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
    <div className="h-full flex items-center">
      <div className="p-6 mx-auto w-full space-y-4 max-w-xl">
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
    </div>
  )
}

export default App
