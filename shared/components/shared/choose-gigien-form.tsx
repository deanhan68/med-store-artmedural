'use client';
import React from 'react';
import { Title } from './title';
import { cn } from '@/shared/lib/utils';
import { GigienImage } from './gigien-image';
import { Button } from '../ui';
import { GroupVariants } from './group-variants';
import { GigienType, gigienTypes, GigienVolue } from '@/shared/constants/gigien';
import { CountProduct, ProductItem } from '@prisma/client';
import { QuantitiItem } from './quantiti-item';
import { useGigienOptions } from '@/shared/hooks';
import { getGigienDetails } from '@/shared/lib';

interface Props {
    imageUrl: string;
    name: string;
    description?: string | null;
    countProduct: CountProduct[];
    items: ProductItem[];
    loading?: boolean; 
    onSubmit: (itemId: number, countProduct: number[]) => void;
    className?: string;
}

export const ChooseGigienForm: React.FC<Props> = ({  
    name,
    description, 
    items,
    imageUrl,
    countProduct,
    loading,
    onSubmit, 
    className, 
}) => {
    const {volue, gigienType, selectedCountProducts, availableVolues, currentItemId, setVolue, setGigienType, addQuantiti } =
     useGigienOptions(items);

    const {totalPrice, textDetails} = getGigienDetails(gigienType, volue, items, countProduct, selectedCountProducts);

    const handleClick = () => {
      if(currentItemId) {
        onSubmit(currentItemId, Array.from(selectedCountProducts));
      }
    }
    
    return (
        <div className={cn(className, 'flex w-full h-[580px] bg-white overflow-hidden')}>
            
            {/* ЛЕВАЯ ЧАСТЬ - С ГРАДУСНИКОМ */}
            <div className="flex items-center justify-center w-[45%] relative bg-white border-r border-gray-50 p-6">
                
                {/* ШКАЛА ОБЪЕМА */}
                <div className="absolute left-8 flex flex-col items-center gap-2">
                    <div className="relative w-2 h-40 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                        <div 
                            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-700 ease-out"
                            style={{ height: `${(volue / 2000) * 100}%` }}
                        />
                        <div className="absolute inset-0 flex flex-col justify-between py-4 pointer-events-none opacity-30">
                            <div className="w-full h-[1px] bg-white" />
                            <div className="w-full h-[1px] bg-white" />
                            <div className="w-full h-[1px] bg-white" />
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-[9px] font-bold text-blue-500 uppercase">Объем</span>
                        <span className="text-xs font-black text-gray-800">{volue >= 1000 ? `${volue/1000} л` : `${volue} мл`}</span>
                    </div>
                </div>

                <div className="w-[300px] h-[300px] flex items-center justify-center">
                    <img src={imageUrl} alt={name} className="object-contain w-full h-full transition-none" />
                </div>
            </div>

            {/* ПРАВАЯ ЧАСТЬ */}
            <div className="w-[55%] flex flex-col bg-white">
                <div className="p-7 flex-1 overflow-y-auto scrollbar">
                    <span className="text-[10px] uppercase tracking-[2px] text-blue-500 font-bold mb-1 block">
                        Дезинфекция и гигиена
                    </span>
                    
                    <Title text={name} size="md" className="font-black text-2xl mb-2 text-gray-800"/>
                    
                    <p className="text-gray-400 text-xs mb-3 pb-3 border-b border-gray-100 italic">{textDetails}</p>

                    {description && (
                        <p className="text-gray-500 text-[13px] leading-relaxed mb-6 bg-blue-50/50 p-4 rounded-xl border-l-4 border-blue-400 font-medium">
                            {description}
                        </p>
                    )}

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h4 className="text-[11px] font-bold uppercase text-gray-400 tracking-widest">1. Выберите объем:</h4>
                            <GroupVariants 
                                items={availableVolues} 
                                value={String(volue)} 
                                onClick={value => setVolue(Number(value) as GigienVolue)}
                            />
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-[11px] font-bold uppercase text-gray-400 tracking-widest">2. Тип упаковки:</h4>
                            <GroupVariants 
                                items={gigienTypes} 
                                value={String(gigienType)} 
                                onClick={value => setGigienType(Number(value) as GigienType)}
                            />
                        </div>

                        <div className="space-y-2 pb-2">
                            <h4 className="text-[11px] font-bold uppercase text-gray-400 tracking-widest">3. Добавить к заказу:</h4>
                            <div className="grid grid-cols-3 gap-2">
                                {countProduct.map((item) => (
                                    <QuantitiItem
                                        key={item.id}
                                        name={item.name} 
                                        price={item.price} 
                                        imageUrl={item.name}
                                        onClick={() => addQuantiti(item.id)}
                                        active={selectedCountProducts.has(item.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ФУТЕР - С ЦЕНОЙ ВНУТРИ КНОПКИ */}
                <div className="p-7 border-t border-gray-100 bg-white">
                    <Button 
                        loading={loading}
                        onClick={handleClick} 
                        className="h-[60px] text-lg font-bold rounded-2xl w-full shadow-lg shadow-blue-100 active:scale-95 bg-blue-600 hover:bg-blue-500 transition-all"
                    >
                        Добавить в корзину за {totalPrice} ₽
                    </Button>
                </div>
            </div>
        </div>
    );
};

