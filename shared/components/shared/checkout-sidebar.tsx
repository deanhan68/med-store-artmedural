import { cn } from '@/shared/lib/utils';
import React from 'react';
import { WhiteBlock } from './white-block';
import { CheckoutItemDetails } from './checkout-item-details';
import { ArrowRight, Gift, Package, Truck } from 'lucide-react';
import { Button, Skeleton } from '../ui';
import { fa } from 'zod/v4/locales';



const DIS = 15; 
const DELIVERY_PRICE = 250; 

interface Props {
    totalAmount: number;
    loading?: boolean;
    className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading, className }) => {

    const discountPrice = Math.round((totalAmount * DIS) / 100);
    const totalPrice = totalAmount - discountPrice + DELIVERY_PRICE;

  return (
    <WhiteBlock className={cn(("p-6 sticky top-4"), className)}>
        <div className="flex flex-col gap-1 mb-6">
            <span className="text-xl">Итого:</span>
            {
                loading ? (
                 <Skeleton className='w-48 h-11'/>
                  ): ( 
                  <span className="h-11 text-[32px] font-extrabold">{totalPrice} ₽</span>
            )}
        </div>

        <div className="flex flex-col gap-1">
            <CheckoutItemDetails
            title={
                <div className="flex items-center">
                <Package size={18} className="mr-2 text-gray-400" />
                Стоимость товаров:
                </div>
            }
            value={loading ? <Skeleton className='w-16 h-6 rounded-[6px]'/>  : `${totalAmount} ₽`}
            />

            <CheckoutItemDetails
            title={
                <div className="flex items-center">
                <Truck size={18} className="mr-2 text-gray-400" />
                Доставка:
                </div>
            }
            value={loading ? <Skeleton className='w-16 h-6 rounded-[6px]'/>  :`${DELIVERY_PRICE} ₽`}
            />

            <CheckoutItemDetails
            title={
                <div className="flex items-center">
                <Gift size={18} className="mr-2 text-gray-400" />
                Скидка {DIS}%:
                </div>
            }
            value={loading ? <Skeleton className='w-16 h-6 rounded-[6px]'/>  : `- ${discountPrice} ₽`}
            className="text-green-600"
            />
        </div>

        <Button
            type="submit"
            className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
        >
            Перейти к оплате
            <ArrowRight className="w-5 ml-2" />
        </Button>
    </WhiteBlock>
  );
};










