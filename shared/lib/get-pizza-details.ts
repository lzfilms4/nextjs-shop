import { ProductItem, Ingredient } from "@prisma/client"
import { PizzaType, PizzaSize, mapPizzaType } from "../constants/pizza"
import { calcTotalPizzaPrice } from "./calc-total-pizza-price"

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const textDetails = `${size} см, ${mapPizzaType[type]} тесто`
  const totalPrice = calcTotalPizzaPrice(
    size,
    type,
    items,
    ingredients,
    selectedIngredients
  )

  return { totalPrice, textDetails }
}
