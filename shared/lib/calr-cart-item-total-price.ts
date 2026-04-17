import { CartItemDTO } from "../services/dto/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
    const countProductPrice = item.countProduct.reduce((acc, ingredient) => acc + ingredient.price, 0);
    const typePrice = item.productItem.productType === 1 ? 100 : 0;

    const total = (item.productItem.price + typePrice + countProductPrice) * item.quantity;
    
    // Удалишь это перед деплоем, но сейчас это спасет нервы
    console.log(`Товар: ${item.productItem.id}, База: ${item.productItem.price}, Упаковка: ${typePrice}, Допы: ${countProductPrice}, Кол-во: ${item.quantity}, Итого: ${total}`);

    return total;
};