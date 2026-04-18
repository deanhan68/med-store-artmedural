'use client'

import React from 'react';
import { Title } from './title';
import { Input } from '../ui/input';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useQueryFilters, useQuantiti, useFilters  } from '@/shared/hooks';

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const {quantiti, loading} = useQuantiti();
  const filters = useFilters();
  
  useQueryFilters(filters);


  const items = quantiti.map((item) => ({value: String(item.id), text: item.name}));

  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  }

  return (
   <div className={className}>
        <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

        {/* Вверхние чекбоксы */}
        <CheckboxFiltersGroup 
          title="Стерильность"
          name="sterTypes"
          className="mb-5"
          onClickCheckbox={filters.setSterTypes}
          selected={filters.sterTypes}
          items={[
            {text: 'Стерильный блок', value: '1'},
            {text: 'Стандартная упаковка', value: '2'},
          ]}
          
        />      

        <CheckboxFiltersGroup 
          title="Объем"
          name="volues"
          className="mb-5"
          onClickCheckbox={filters.setVolues}
          selected={filters.volues}
          items={[
            {text: '0,5 л.', value: '500'},  // Если в базе мл
            {text: '1 л.', value: '1000'},
            {text: '2 л.', value: '2000'},
          ]}
          
        />      
        
        
       

        {/* Фильтр цен */}

        <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
            <p className="font-bold mb-3">Цена от и до:</p>
            <div className="flex gap-3 mb-5">
            <Input 
              type="number"
              placeholder="0"
              min={0}
              max={2000}
              value={String(filters.prices.priceFrom)}
              onChange = {(e) => filters.setPrices('priceFrom', Number(e.target.value))}
            />

            <Input
              type="number"
              min={300}
              max={2000}
              placeholder="2000"
              value={String(filters.prices.priceTo)}
              onChange = {(e) => filters.setPrices('priceTo', Number(e.target.value))}
            />

            </div>
              <RangeSlider 
                min={0} 
                max={2000} 
                step={100} 
                value= {[filters.prices.priceFrom || 0, filters.prices.priceTo || 30000]} 
                onValueChange={updatePrices}
            />
        </div>

         {/* поменял количество на дополнительные приборы*/}
        <CheckboxFiltersGroup 
        title="Дополнительно:"
        name="quantiti"
        className="mt-5"
        limit={2}
        defaultItems={items.slice(0, 3)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.setSelectedQuantiti}
        selected={filters.selectedCountProduct }
        />      
   </div>
  );
};
