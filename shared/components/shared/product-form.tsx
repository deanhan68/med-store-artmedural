'use client';

import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store";
import React from "react";
import toast from "react-hot-toast";
import { ChooseGigienForm } from "./choose-gigien-form";
import { ChooseProductForm } from "./choose-product-form";

interface Props {
    product: ProductWithRelations;
    onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit: _onSubmit }) => {
    const addCartItem = useCartStore((state) => state.addCartItem);
    const loading = useCartStore((state) => state.loading);
    
    const firstItem = product.items[0];
    const isGigienForm = Boolean(firstItem.productType);

    const onSubmit = async (productItemId?: number, countProduct?: number[]) => {
        try {
            const itemId = productItemId ?? firstItem.id;

            await addCartItem({
                productItemId: itemId,
                countProduct,
            });

            toast.success(product.name + ' успешно добавлен в корзину');
            _onSubmit?.();
        } catch (err) {
            toast.error('Не удалось добавить ' + product.name + ' в корзину');
            console.error(err);
        }
    };

    if (isGigienForm) {
        return (
            <ChooseGigienForm 
                imageUrl={product.imageUrl} 
                name={product.name} 
                // Превращаем null в undefined для TS
                description={product.description ?? undefined} 
                countProduct={product.countProduct}
                items={product.items}
                onSubmit={onSubmit}
                loading={loading}
            />
        );
    }

    return (
        <ChooseProductForm 
            imageUrl={product.imageUrl} 
            name={product.name} 
            // Превращаем null в undefined для TS
            description={product.description ?? undefined}
            onSubmit={() => onSubmit()}
            price={firstItem.price}
            loading={loading} 
        />
    );
};