'use client';
import { cn } from "@/shared/lib/utils";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, ShoppingBasket } from "lucide-react";
import { CartDrawer } from "./cart-drawer";
import { useCartStore } from "@/shared/store";


interface Props {
    className?: string;
}

/* cn('flex items-center justify-center flex-1 relative w-full') */

export const CartButton: React.FC<Props> = ({className}) => {

    const totalAmount = useCartStore((state) => state.totalAmount);
    const items = useCartStore((state) => state.items);
    const loading = useCartStore((state) => state.loading);
    return (
        <CartDrawer>
            
            <Button loading={loading} className={cn("group relative", {'w-[105px]' : loading }, className)}>
                <b>{totalAmount} ₽</b>
                <span className="h-full w-[1px] bg-white/30 mx-3"></span>
                <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                    <ShoppingBasket className="h-4 w-4 relative" strokeWidth={2}/>
                    <b>{items.length}</b>
                </div>
                <ArrowRight size = {20} className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"/>
            </Button>
        
        </CartDrawer>
        
        
        
        

    )
}