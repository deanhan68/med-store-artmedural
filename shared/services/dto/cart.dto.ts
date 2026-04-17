import { Cart, CartItem, CountProduct, Product, ProductItem } from "@prisma/client";

export type CartItemDTO = CartItem & {
    productItem: ProductItem & {
        product: Product;
    };
    countProduct: CountProduct[];

};

export interface CartDTO extends Cart{
    items:CartItemDTO[];
    
};

export interface CreateCartItemValues {
    productItemId: number;
    countProduct?: number[];
}