import { Variant } from "@/components/shared/group-variants"
import React from "react"
import { PizzaSize, PizzaType } from "../constants/pizza"
import { useSet } from "react-use"
import { getAvaliablePizzaSizes } from "../lib/get-avaliable-pizza-sizes"
import { ProductItem } from "@prisma/client"

interface ReturnProps {
  size: PizzaSize
  type: PizzaType
  selectedIngredients: Set<number>
  avaliableSizes: Variant[]
  currentItemId?: number
  setSize: (size: PizzaSize) => void
  setType: (type: PizzaType) => void
  addIngredient: (id: number) => void
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = React.useState<PizzaSize>(20)
  const [type, setType] = React.useState<PizzaType>(1)
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  )

  const avaliableSizes = getAvaliablePizzaSizes(items, type)

  const currentItemId = items.find(
    (item) => item.size === size && item.pizzaType === type
  )?.id

  React.useEffect(() => {
    const isAvaliableSize = avaliableSizes.find(
      (item) => Number(item.value) === Number(size) && !item.disabled
    )
    const avaliableSize = avaliableSizes.find((size) => !size.disabled)

    if (!isAvaliableSize && avaliableSize)
      setSize(Number(avaliableSize.value) as PizzaSize)
  }, [type])

  return {
    size,
    type,
    selectedIngredients,
    avaliableSizes,
    currentItemId,
    addIngredient,
    setSize,
    setType,
  }
}
