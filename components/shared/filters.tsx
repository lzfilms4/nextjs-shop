"use client"

import React from "react"
import { Title } from "./title"
import { Input } from "../ui"
import { RangeSlider } from "./range-slider"
import { CheckboxFiltersGroup } from "./checkbox-filters-group"
import { useIngredients } from "@/shared/hooks/use-ingredients"
import { useFilters } from "@/shared/hooks/use-filters"
import { useQueryFilters } from "@/shared/hooks/use-query-filters"

interface Props {
  className?: string
}

interface PriceProps {
  priceFrom?: number
  priceTo?: number
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients()
  const filters = useFilters()

  useQueryFilters(filters)

  const items = ingredients.map((ingredient) => ({
    text: ingredient.name,
    value: String(ingredient.id),
  }))

  const updatePrices = (prices: number[]) => {
    filters.setPrices("priceFrom", Number(prices[0]))
    filters.setPrices("priceTo", Number(prices[1]))
  }

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
      <CheckboxFiltersGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
        onClickCheckbox={filters.setPizzaTypes}
        values={filters.pizzaTypes}
      />

      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        items={[
          { text: "20 см", value: "20" },
          { text: "30 см", value: "30" },
          { text: "40 см", value: "40" },
        ]}
        onClickCheckbox={filters.setSizes}
        values={filters.sizes}
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(filters.priceFrom)}
            onChange={(e) =>
              filters.setPrices("priceFrom", Number(e.target.value))
            }
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
            value={String(filters.priceTo)}
            onChange={(e) =>
              filters.setPrices("priceTo", Number(e.target.value))
            }
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[filters.priceFrom || 0, filters.priceTo || 1000]}
          onValueChange={updatePrices}
        />
      </div>

      <CheckboxFiltersGroup
        title="Ингредиенты"
        name="ingredient"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.setIngredients}
        values={filters.selectedIngredients}
      />
    </div>
  )
}

// 7:24
