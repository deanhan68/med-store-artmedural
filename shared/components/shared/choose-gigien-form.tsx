'use client';
import React from 'react';
import { Title } from './title';
import { cn } from '@/shared/lib/utils';
import { GigienImage } from './gigien-image';
import { Button } from '../ui';
import { GroupVariants } from './group-variants';
import { GigienType, gigienTypes, GigienVolue, gigienVolues, mapGigienType } from '@/shared/constants/gigien';
import { CountProduct, ProductItem } from '@prisma/client';
import { QuantitiItem } from './quantiti-item';
import { useGigienOptions } from '@/shared/hooks';
import { getGigienDetails } from '@/shared/lib';






interface Props {
    imageUrl: string;
    name:string;
    countProduct: CountProduct[];
    items: ProductItem[] ;
    onClickAddCart?: VoidFunction;
    className?: string;
    

}

export const ChooseGigienForm: React.FC<Props> = ({  
    name, 
    items,
    imageUrl,
    onClickAddCart, 
    countProduct,
    className, 
}) => {

    // хук настроек
    const {volue, gigienType, selectedCountProducts, availableVolues, setVolue, setGigienType, addQuantiti } =
     useGigienOptions(items);

    // Калькуляция

    const {totalPrice, textDetails} = getGigienDetails(
      gigienType,  
      volue, 
      items, 
      countProduct, 
      selectedCountProducts
    );
    


    const handleClick = () => {
      onClickAddCart?.();
      console.log({
        volue,
        gigienType,
        countProduct: selectedCountProducts,
      });
    }

  
    return <div className={cn(className, 'flex w-full h-full')}>

    {/* ЛЕВАЯ ЧАСТЬ */}
    <div className="flex items-center justify-center w-1/2 overflow-hidden">
      <GigienImage imageUrl={imageUrl} size={volue as 500 | 1000 | 2000} />
    </div>

    {/* ПРАВАЯ ЧАСТЬ */}
    <div className="w-1/2 bg-[#f7f6f5] p-7 flex-1 justify-between">

      <div>
        <Title text={name} size="md" className="font-extrabold mb-1 mt-1"/>
        <p className="text-gray-400">{textDetails}</p>
      </div>


      <div className='flex flex-col gap-1 m-2'>
        <GroupVariants items={availableVolues} value={String(volue)} onClick={value => setVolue(Number(value) as GigienVolue)}/>
        <GroupVariants items={gigienTypes} value={String(gigienType)} onClick={value => setGigienType(Number(value) as GigienType)}/>
      </div>

      <div className='bg-gray-50 p-5 rounded-md overflow-auto'>
        <div className='grid grid-cols-3 gap-2'>
          {countProduct.map((countProduct) => (
            <QuantitiItem
              key={countProduct.id}
              name={countProduct.name} 
              price={countProduct.price} 
              imageUrl={countProduct.name}
              onClick={() => addQuantiti(countProduct.id)}
              active={selectedCountProducts.has(countProduct.id)}

            >
              
            </QuantitiItem>
          ))}

        </div>
      </div>

        {/* ПОДПИСЬ ОБЪЕМА  */}
      {/*<span className="mt-12 text-base text-gray-600">
      Объём: <b className="text-black text-ls">{gigienVolues.find(v => Number(v.value) === volue)?.name}</b>
      </span>

      */}


      <Button 
        onClick={handleClick} 
        className="h-[55px] px-10 text-base rounded-[11px] w-full mt-30 ">
        Добавить в корзину за {totalPrice} ₽
      </Button>
    </div>

  </div>


};