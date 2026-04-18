'use client';
import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Dialog, DialogContent, DialogTitle } from '@/shared/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import { ProductForm } from '../product-form';

interface Props {
    product: ProductWithRelations; 
    className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router = useRouter(); 

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn(
                    "p-0 w-[1100px] !max-w-[1100px] min-h-[450px] bg-white overflow-hidden",
                    className
                )}>
                <ProductForm product={product} onSubmit={() => router.back()}/>

                {/*  ДОБОВЛЕНИЕ*/}
                <DialogTitle className="hidden">
                    {product.name}
                </DialogTitle>
            </DialogContent>
        </Dialog>

        
    );

};


