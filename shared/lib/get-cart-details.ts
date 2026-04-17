import { CartDTO } from "../services/dto/cart.dto";
import { calcCartItemTotalPrice } from "./calr-cart-item-total-price";


export type CartStateItem = {
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    productSize?: number | null;
    productType?: number | null;
    countProduct: Array<{name: string, price: number}>;
};

interface ReturnProps {
    items: CartStateItem[];
    totalAmount: number;
}
export const getCartDetails =  (data: CartDTO): ReturnProps => {
    const items = data.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        name: item.productItem.product.name,
        imageUrl: item.productItem.product.imageUrl,
        price: calcCartItemTotalPrice(item),
        productSize: item.productItem.size,
        productType: item.productItem.productType,
        countProduct: item.countProduct.map((quantiti) => ({
            name: quantiti.name,
            price: quantiti.price,
        })),
    }))

    return {
        items,
        totalAmount: data.totalAmount,
    };
};