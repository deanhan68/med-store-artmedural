'use client';

import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import { IdCard } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface Props {
    className?: string;
}




const cats = [
    {id:1, name:"Гигиена"},
    {id:2, name:"Медецинская одежда"},
    {id:3, name:"Стерилизация"},
    {id:4, name:"Расходные материалы"},
    {id:5, name:"Инструменты"},
    {id:6, name:"Оборудование"},
];


export const Categories: React.FC<Props> = ({ className }) => {
    const activeId = useCategoryStore((state) => state.activeId);
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
        {
            cats.map(({name, id}, index) => (
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