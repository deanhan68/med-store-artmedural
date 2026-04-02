'use client';
import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Dialog, DialogContent, DialogTitle } from '@/shared/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '../choose-product-form';
import { ProductWithRelations } from '@/@types/prisma';
import { ChooseGigienForm } from '../choose-gigien-form';

interface Props {
    product: ProductWithRelations; 
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {

    const router = useRouter(); 
    const isGigienForm = Boolean(product.items[0].productType);

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
                        />
                    ) :  ( <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
                    
                    
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


