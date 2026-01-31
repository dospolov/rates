import type { CurrencyConversionResponse } from "@/types"

export default async function getRates({
  amount,
  from,
  to,
}: {
  amount: number
  from: string
  to: string
}): Promise<CurrencyConversionResponse> {
  const response = await fetch(
    `https://api.fxratesapi.com/convert?from=${from}&to=${to}&amount=${amount}&format=json`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_FXRATES_TOKEN}`,
      },
    },
  )
  return response.json() as Promise<CurrencyConversionResponse>
}
