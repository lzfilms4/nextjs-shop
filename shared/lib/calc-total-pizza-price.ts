import { Ingredient, ProductItem } from "@prisma/client"

export const calcTotalPizzaPrice = (
  size: number,
  type: number,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)
      ?.price || 0
  const totalIngredientsPrice = ingredients
    .filter((item) => selectedIngredients.has(item.id))
    .reduce((acc, item) => acc + item.price, 0)
  const totalPrice = pizzaPrice + totalIngredientsPrice

  return totalPrice
}
