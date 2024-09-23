"use client"

import { Dialog } from "@/components/ui"
import { DialogContent, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/shared/lib/utils"
import { useRouter } from "next/navigation"
import React from "react"
import { ChooseProductForm } from "../choose-product-form"
import { ProductWithRelations } from "@/@types/prisma"
import { ChoosePizzaForm } from "../choose-pizza-form"
import { useCartStore } from "@/shared/store/cart"

interface Props {
  product: ProductWithRelations
  className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter()
  const firstItem = product.items[0]
  const isPizzaForm = Boolean(firstItem.pizzaType)
  const addCartItem = useCartStore((state) => state.addCartItem)
  const onAddProduct = () => {
    addCartItem({
      productItemId: firstItem.id,
    })
  }

  const onAddPizza = (productItemId: number, ingredients: number[]) => {
    addCartItem({
      productItemId,
      ingredients,
    })
  }

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogTitle>Выбор</DialogTitle>

      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
        aria-describedby="description"
      >
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
            onSubmit={onAddPizza}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            onSubmit={onAddProduct}
            price={firstItem.price}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

//13 : 11
