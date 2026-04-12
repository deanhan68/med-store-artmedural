
import React from "react";
import { cn } from "@/shared/lib/utils";
import { CartItemDetailsImage, CartItemDetailsPrice, CartItemInfo } from "./cart-item-details";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { CountButton } from "./count-button";
import { Trash2Icon } from "lucide-react";


interface Props extends CartItemProps {
    className?: string;
}



export const CartDrawerItem: React.FC<Props> = ({
    id,
    imageUrl,
    name,
    price,
    quantity,
    details,
    className,

}) => {
    return (
        <div className={cn('flex bg-white p-5 gap-6', className)}>
            <CartItemDetailsImage src={imageUrl} />

            <div className="flex-1">
    <CartItemInfo name={name} details={details}/>

    <hr className="my-3"/>
    
                {/* Исправили опечатку в justify-between и добавили items-center */}
                <div className="flex items-center justify-between"> 
                    <CountButton onClick={(type) => console.log(type)} value={quantity}/>
                    
                    {/* Убрали flex-1, добавили gap и правильное центрирование */}
                    <div className="flex items-center gap-3">
                        <CartItemDetailsPrice value={price}/>
                        <Trash2Icon 
                            className="text-gray-400 cursor-pointer hover:text-gray-600 transition" 
                            size={16}
                        />
                    </div>
                </div>
            </div>
        </div>

    );
};