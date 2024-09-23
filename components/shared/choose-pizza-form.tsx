import { cn } from "@/shared/lib/utils"
import { Ingredient, ProductItem } from "@prisma/client"
import React from "react"
import { PizzaImage } from "./pizza-image"
import { Title } from "./title"
import { Button } from "../ui/button"
import { GroupVariants } from "./group-variants"
import { PizzaSize, PizzaType, pizzaTypes } from "@/shared/constants/pizza"
import { IngredientItem } from "./ingredient-item"
import { usePizzaOptions } from "@/shared/hooks/use-pizza-options"
import { getPizzaDetails } from "@/shared/lib/get-pizza-details"

interface Props {
  imageUrl: string
  name: string
  ingredients: Ingredient[]
  items: ProductItem[]
  loading?: boolean
  onSubmit?: (itemId: number, ingredients: number[]) => void
  className?: string
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className,
}) => {
  const {
    size,
    type,
    selectedIngredients,
    currentItemId,
    setSize,
    setType,
    addIngredient,
    avaliableSizes,
  } = usePizzaOptions(items)

  const { totalPrice, textDetails } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  )

  const handleClickAdd = () => {
    if (currentItemId)
      onSubmit?.(currentItemId, Array.from(selectedIngredients))
  }

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#e4e4e4] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>
        <div className="flex flex-col gap-3 mt-5">
          <GroupVariants
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
            items={avaliableSizes}
          />
          <GroupVariants
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
            items={pizzaTypes}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => addIngredient(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          // loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base w-full mt-10"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  )
}
