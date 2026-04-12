import { CountProduct } from "@prisma/client";
import { GigienType, GigienVolue } from "../constants/gigien";

export const getCartItemDetails = (
    gigienType: GigienType,
    gigienVolue: GigienVolue,
    countProduct: CountProduct[],


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