import { CountProduct } from "@prisma/client";
import { GigienType, GigienVolue } from "../constants/gigien";
import { CartStateItem } from "./get-cart-details";

export const getCartItemDetails = (
    countProduct: CartStateItem['countProduct'],
    gigienType: GigienType,
    gigienVolue: GigienVolue,
    


) => {
    const details = [] 

    if (gigienVolue) {
        const typeName = gigienType === 1 ? 'Стерильный блок' : 'Стандартная упаковка';
        details.push(`${typeName} ${gigienVolue} л.`);
    }

    if (countProduct) {
        details.push(...countProduct.map((countProduct) => countProduct.name));
    }


    return details.join(', ')

};