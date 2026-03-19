'use client'

import React from 'react';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui/input';
import { Slider } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useFilterQuantiti } from '@/hooks/useFilterQuantiti';


interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { quantiti, loading, onAddId, selectedIds } = useFilterQuantiti();

  const items = quantiti.map((item) => ({value: String(item.id), text: item.name}));

  return (
   <div className={className}>
        <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

        {/* Вверхние чекбоксы */}

        <div className="flex flex-col gap-4">
            <FilterCheckbox name="qwe" text="Стерильные" value="1" />
            <FilterCheckbox name="qwe2" text="Нестерильные" value="2" />
        </div>

        {/* Фильтр цен */}

        <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
            <p className="font-bold mb-3">Цена от и до:</p>
            <div className="flex gap-3 mb-5">
            <Input type="number" placeholder="300" min={0} max={30000} defaultValue={0} />
            <Input type="number" min={0} max={50000} placeholder="30000" />
            </div>
            <RangeSlider min={0} max={50000} step={10} value={[0, 50000]} />
        </div>

        
        <CheckboxFiltersGroup
        title="Колчество:"
        name="quantiti"
        className="mt-5"
        limit={2}
        defaultItems={items.slice(0, 3)}
        items={items}
        loading={loading}
        onClickCheckbox={onAddId}
        selectedIds={selectedIds }
      />      
   </div>
  );
};
