'use client';
import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Dialog, DialogContent, DialogTitle } from '@/shared/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '../choose-product-form';
import { ProductWithRelations } from '@/@types/prisma';
import { ChooseGigienForm } from '../choose-gigien-form';
import { useCartStore } from '@/shared/store';
import { error } from 'console';
import toast from 'react-hot-toast';

interface Props {
    product: ProductWithRelations; 
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {

    const router = useRouter(); 
    const firstItem = product.items[0];
    const isGigienForm = Boolean(firstItem.productType);
    const addCartItem = useCartStore((state) => state.addCartItem);
    const loading = useCartStore((state) => state.loading);
    


    

    const onSubmit = async (productItemId?: number, countProduct?: number[]) => {
        try {

            const itemId = productItemId ?? firstItem.id;


            await addCartItem({
                    productItemId: itemId,
                    countProduct,
                });

            toast.success(product.name + ' успешно добавлен в корзину');
            router.back();
        } catch (err) {
            toast.error('Не удалось добавить '+ product.name + ' в корзину')
            console.error(err);
        }
    }

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn(
                    "p-0 w-[1100px] !max-w-[1100px] min-h-[450px] bg-white overflow-hidden",
                    className
                )}>

                {
                    isGigienForm ? (
                        <ChooseGigienForm 
                            imageUrl={product.imageUrl} 
                            name={product.name} 
                            countProduct={product.countProduct}
                            items={product.items}
                            onSubmit={onSubmit}
                            loading={loading}
                        />
                    ) :  ( <ChooseProductForm 
                            imageUrl={product.imageUrl} 
                            name={product.name} 
                            onSubmit={() => onSubmit()}
                            price={firstItem.price}
                            loading={loading} 
                            />
                    
                    
                    )
                }

            
                {/*  ДОБОВЛЕНИЕ*/}

                <DialogTitle className="hidden">
                    {product.name}
                </DialogTitle>

               
                
            </DialogContent>
        </Dialog>

        
    );

};


