'use client';

import React from 'react';
import { Title } from './title';
import { cn } from '@/shared/lib/utils';
import { Button } from '../ui';
import { ProductDefaultImage } from './product-default-image';

interface Props {
    imageUrl: string;
    name: string;
    description?: string | null;
    price: number;
    loading?: boolean; 
    onSubmit?: VoidFunction;
    className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({  
    name, 
    description,
    imageUrl,
    price,
    loading,
    onSubmit, 
    className 
}) => {
    return (
        <div className={cn(className, 'flex w-full h-full bg-white overflow-hidden')}>
            {/* ЛЕВАЯ ЧАСТЬ - Белый фон и центрирование */}
            <div className="flex items-center justify-center w-[50%] border-r border-gray-100 p-6">
                <ProductDefaultImage imageUrl={imageUrl} size={30} />
            </div>

            {/* ПРАВАЯ ЧАСТЬ - Чистый и современный дизайн */}
            <div className="w-[50%] bg-[#fafafa] p-10 flex flex-col justify-between">
                <div>
                    {/* Бейдж категории (опционально) */}
                    <span className="text-[10px] uppercase tracking-[2px] text-blue-500 font-bold mb-2 block">
                        Медицинский инвентарь
                    </span>

                    <Title text={name} size="lg" className="font-black text-3xl mb-4 leading-tight text-gray-800"/>
                    
                    {/* Статус наличия */}
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs text-gray-500 font-medium tracking-wide">В наличии</span>
                    </div>

                    <div className="h-[2px] w-10 bg-blue-500 mb-6" />

                    {/* Описание с хорошим межстрочным интервалом */}
                    {description && (
                        <p className="text-gray-500 text-[15px] leading-relaxed mb-8 italic">
                            {description}
                        </p>
                    )}

                    {/* Мини-характеристики для солидности */}
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Артикул:</span>
                            <span className="text-gray-600 font-medium">ART-00{price}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Гарантия:</span>
                            <span className="text-gray-600 font-medium">Есть</span>
                        </div>
                    </div>
                </div>

                {/* Блок цены и кнопки */}
                <div className="mt-8 border-t border-gray-200 pt-8">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-400 text-sm font-medium">Цена за ед.</span>
                        <span className="text-3xl font-black text-gray-900">{price} ₽</span>
                    </div>

                    <Button 
                        loading={loading} 
                        onClick={onSubmit} 
                        className="h-[60px] px-10 text-lg font-bold rounded-2xl w-full transition-all hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-blue-100"
                    >
                        Добавить в корзину
                    </Button>
                </div>
            </div>
            
        </div>
    );
};