
import { calcTotalGigienPrice } from "./calc-total-gigien-price";
import { CountProduct, ProductItem } from "@prisma/client";
import { GigienType, GigienVolue, mapGigienType } from "../constants/gigien";




export const getGigienDetails = ( 
    gigienType: GigienType,
    volue: GigienVolue,
    items: ProductItem[],
    countProduct: CountProduct[],
    selectedCountProducts: Set<number>,
    
) => {
    const totalPrice = calcTotalGigienPrice(gigienType, volue as GigienVolue, items, countProduct,selectedCountProducts,);
    // корректировка объема
    const formattedSize = volue >= 1000 ? `${volue / 1000} л` : `${volue / 1000}`.replace('.', ',') + ' л';
    // -
    const textDetails = `${formattedSize}, ${mapGigienType[gigienType as keyof typeof mapGigienType]}, допы (${selectedCountProducts.size})`;

    return {totalPrice, textDetails}
}