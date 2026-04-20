import React from "react";
import { useShallow } from "zustand/react/shallow";
import { useCartStore } from "../store";
import { CartItem } from "@prisma/client";
import { CreateCartItemValues } from "../services/dto/cart.dto";
import { CartStateItem } from "../lib/get-cart-details";



type ReturnProps = {
    totalAmount: number;
    items: CartStateItem[];
    loading: boolean;
    updateItemQuantity: (id: number, quantity: number) => void;
    removeCartItem: (id: number) => void;
    addCartItem: (values: CreateCartItemValues) => void;
}

export const useCart = (): ReturnProps => {
    const cartState = useCartStore(
        useShallow((state) => state),
    );
    React.useEffect(() => {
        cartState.fetchCartItems();
    }, []);
    return cartState;
} 

