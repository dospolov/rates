import type { Currency, SetAmountAction } from "./types"

// useEffect(() => {
//   // fetch using native fetch API and bearer token
//   fetch(
//     "https://api.fxratesapi.com/convert?from=GBP&to=EUR&date=2012-06-24&amount=234.12&format=json",
//     {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${import.meta.env.VITE_FXRATES_TOKEN}`,
//       },
//     }
//   )
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((error) => console.error(error))
// }, [])

export default function Input({
  code,
  symbol,
  amount,
  dispatch,
}: Currency & {
  dispatch: (action: SetAmountAction) => void
}) {
  return (
    <div>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">{symbol}</span>
        </div>
        <input
          type="text"
          name="price"
          id="price"
          value={amount ?? ""}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-7 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="0.00"
          aria-describedby="price-currency"
          onChange={(e) => {
            const floatAmount = parseFloat(e.target.value)
            if (floatAmount !== amount) {
              dispatch({
                type: "SET_AMOUNT",
                payload: {
                  code,
                  amount:
                    e.target.value && !isNaN(floatAmount) ? floatAmount : null,
                },
              })
            }
          }}
          onFocus={(e) => e.target.select()}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-gray-500 sm:text-sm" id="price-currency">
            {code}
          </span>
        </div>
      </div>
    </div>
  )
}