'use client'

import React from 'react';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui/input';
import { Slider } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';


interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  return (
   <div className={className}>
        <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

        {/* Вверхние чекбоксы */}

        <div className="flex flex-col gap-4">
            <FilterCheckbox text="Стерильные" value="1" />
            <FilterCheckbox text="Нестерильные" value="2" />
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
        title="Производитель:"
        className="mt-5"
        limit={5}
        defaultItems={[
          {
            text: 'Винар',
            value: '1',
          },
          {
            text: 'ВИТА-ПУЛ',
            value: '2',
          },
          {
            text: 'КлиниПак',
            value: '3',
          },
          {
            text: 'Медитек',
            value: '4',
          },
          {
            text: 'Навтекс',
            value: '5',
          },
          {
            text: 'Ньюфарм',
            value: '6',
          },
          {
            text: 'Винар',
            value: '1',
          },
          {
            text: 'ВИТА-ПУЛ',
            value: '2',
          },
          {
            text: 'КлиниПак',
            value: '3',
          },
          {
            text: 'Медитек',
            value: '4',
          },
          {
            text: 'Навтекс',
            value: '5',
          },
          {
            text: 'Ньюфарм',
            value: '6',
          },
        ]}
        items={[
          {
            text: 'Винар',
            value: '1',
          },
          {
            text: 'ВИТА-ПУЛ',
            value: '2',
          },
          {
            text: 'КлиниПак',
            value: '3',
          },
          {
            text: 'Медитек',
            value: '4',
          },
          {
            text: 'Навтекс',
            value: '5',
          },
          {
            text: 'Ньюфарм',
            value: '6',
          },
          {
            text: 'Винар',
            value: '1',
          },
          {
            text: 'ВИТА-ПУЛ',
            value: '2',
          },
          {
            text: 'КлиниПак',
            value: '3',
          },
          {
            text: 'Медитек',
            value: '4',
          },
          {
            text: 'Навтекс',
            value: '5',
          },
          {
            text: 'Ньюфарм',
            value: '6',
          },
        ]}
      />      
   </div>
  );
};
