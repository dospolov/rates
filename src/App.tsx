import { useState, useEffect } from "react"
import "./App.css"
import Input from "./Input"

import { useDebounce } from "./hooks"

function App() {
  const [value, setValue] = useState("")

  const debouncedInput = useDebounce(value, 500)

  useEffect(() => {
    if (debouncedInput) {
      console.log("Calling function with:", debouncedInput)
      // Call your function here
    }
  }, [debouncedInput])

  return (
    <div className="p-6 mx-auto max-w-96">
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />

      {/* symbols taken from */}
      {/* https://gist.github.com/Gibbs/3920259 */}
      {/* {Object.values(state).map(({ code, symbol, amount }) => (
        <Input
          key={code}
          code={code}
          symbol={symbol}
          amount={amount}
          dispatch={dispatch}
        />
      ))} */}
    </div>
  )
}

export default App
