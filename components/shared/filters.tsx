import React from "react"
import { Title } from "./title"
import { FilterCheckbox } from "./filter-checkbox"
import { Input } from "../ui"
import { RangeSlider } from "./range-slider"
import { CheckboxFiltersGroup } from "./checkbox-filters-group"

interface Props {
  className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно собирать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            // value={String(filters.prices.priceFrom)}
            // onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
            // value={String(filters.prices.priceTo)}
            // onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[0, 5000]}
          // value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
          // onValueChange={updatePrices}
        />
      </div>

      <CheckboxFiltersGroup
        title="Ингредиенты"
        className="mt-5"
        limit={6}
        defaultItems={[
          {
            text: "Сыр",
            value: "1",
          },
          {
            text: "Огурцы",
            value: "2",
          },
        ]}
        items={[
          {
            text: "Сыр",
            value: "1",
          },
          {
            text: "Огурцы",
            value: "2",
          },
        ]}
      />
    </div>
  )
}
