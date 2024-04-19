import { useReducer } from "react"
import "./App.css"
import Input from "./Input"
import { initialState } from "./const"
import { reducer } from "./reducer"

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

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
