import "./App.css"
import Input from "./Input"

function App() {
  return (
    <div className="p-6 mx-auto max-w-96">
      {/* symbols taken from */}
      {/* https://gist.github.com/Gibbs/3920259 */}
      <Input currency="PLN" symbol="&#122;&#322;" />
      <Input currency="USD" symbol="&#36;" />
      <Input currency="EUR" symbol="&#8364;" />
      <Input currency="UAH" symbol="&#8372;" />
    </div>
  )
}

export default App
