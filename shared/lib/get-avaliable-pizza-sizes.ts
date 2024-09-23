import { ProductItem } from "@prisma/client"
import { pizzaSizes } from "../constants/pizza"
import { Variant } from "@/components/shared/group-variants"

export const getAvaliablePizzaSizes = (
  items: ProductItem[],
  type: number
): Variant[] => {
  const filteredPizzasByType = items.filter((item) => item.pizzaType === type)

  return pizzaSizes.map((item) => ({
    name: item.name,
    value: String(item.value),
    disabled: !filteredPizzasByType.some(
      (pizza) => Number(pizza.size) === Number(item.value)
    ),
  }))
}
