import React from "react"
import { useSearchParams } from "next/navigation"
import { useSet } from "react-use"

interface PriceProps {
  priceFrom?: number
  priceTo?: number
}

interface QueryFilters extends PriceProps {
  pizzaTypes: string
  sizes: string
  ingredients: string
}

export interface Filters {
  sizes: Set<string>
  pizzaTypes: Set<string>
  selectedIngredients: Set<string>
  priceFrom: number | undefined
  priceTo: number | undefined
}

interface ReturnProps extends Filters {
  setIngredients: (key: string) => void
  setPizzaTypes: (key: string) => void
  setSizes: (key: string) => void
  setPrices: (name: keyof PriceProps, value: number) => void
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(","))
  )

  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(searchParams.get("pizzaTypes")?.split(",") || [])
  )

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.get("sizes")?.split(",") || [])
  )

  const [{ priceFrom, priceTo }, setPrices] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  })

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({ ...prev, [name]: value }))
  }

  return {
    sizes,
    pizzaTypes,
    selectedIngredients,
    priceFrom,
    priceTo,
    setIngredients: toggleIngredients,
    setPizzaTypes: togglePizzaTypes,
    setSizes: toggleSizes,
    setPrices: updatePrice,
  }
}
