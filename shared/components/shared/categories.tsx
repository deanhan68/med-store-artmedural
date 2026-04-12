'use client';

import { cn } from '@/shared/lib/utils';
import { useCategoryStore } from '@/shared/store/category';
import { Category } from '@prisma/client';

import React from 'react';

interface Props {
    items: Category[];
    className?: string;
}

/*const cats = [
    {id:1, name:"Гигиена"},
    {id:2, name:"Медецинская одежда"},
    {id:3, name:"Контроль"},
    {id:4, name:"Перевязочные материалы"},
    {id:5, name:"Документация"},
    {id:6, name:"Стериализация"},
];
*/

export const Categories: React.FC<Props> = ({ items, className }) => {
    const activeId = useCategoryStore((state) => state.activeId);
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
        {
            items.map(({name, id}, index) => (
                <a className={cn(
                    'flex items-center font-bold h-11 rounded-2xl px-4',
                    activeId == id && 'bg-white shadow-md shadow-gray-200 text-primary', 
                )}
                href={`/#${name}`}
                key={index}>
                    <button>{name}</button>
                </a>

            ))
        }
    </div>
  );
};