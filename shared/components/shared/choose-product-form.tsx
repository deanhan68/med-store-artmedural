'use client';

import React from 'react';
import { Product } from '@prisma/client';
import { Title } from './title';
import { cn } from '@/shared/lib/utils';
import { GigienImage } from './gigien-image';
import { Button } from '../ui';
import { ProductDefaultImage } from './product-default-image';




interface Props {
    imageUrl: string;
    name:string;
    onClickAdd?: VoidFunction;
    className?: string;
    

}

export const ChooseProductForm: React.FC<Props> = ({  
    name, 
    imageUrl,
    onClickAdd, 
    className 
}) => {
    
    const textDetails = 'Дезинфекция, совмещенная с предстерилизационной очисткой,';
    const totalPrice = 350;

    return <div className={cn(className, 'flex w-full h-full')}>

    {/* ЛЕВАЯ ЧАСТЬ */}
    <div className="flex items-center justify-center w-1/2 overflow-hidden">
      <ProductDefaultImage imageUrl={imageUrl} size={30} />
    </div>

    {/* ПРАВАЯ ЧАСТЬ */}
    <div className="w-1/2 bg-[#f7f6f5] p-7 flex-1 justify-between">
      <div>
        <Title text={name} size="md" className="font-extrabold mb-1 mt-1"/>
        <p className="text-gray-400">{textDetails}</p>
      </div>

      <Button className="h-[55px] px-10 text-base rounded-[11px] w-full mt-80  ">
        Добавить в корзину за {totalPrice} ₽
      </Button>
    </div>

  </div>


};