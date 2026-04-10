import { CountProduct, ProductItem } from "@prisma/client";
import { GigienType, GigienVolue } from "../constants/gigien";


/**
 * Функция для подсчет общей стоимости ГИГИЕНЫ
 * @param gigienType тип упаковки
 * @param volue объем 
 * @param items список вариаций
 * @param countProduct карточки
 * @param selectedCountProducts выбранные карточки 
 * @returns number общую стоимость
 */

export const calcTotalGigienPrice = (
    gigienType: GigienType,
    volue: GigienVolue,
    items: ProductItem[],
    countProduct: CountProduct[],
    selectedCountProducts: Set<number>,

) => {

    const gigienPrice = (items.find((item) => item.productType === 
    gigienType && item.size === volue)?.price ?? 0) + (gigienType === 1 ? 100 : 0);
    const totalCountProductPrice = countProduct
      .filter((item) => selectedCountProducts.has(item.id))
      .reduce((acc, item) => acc + item.price, 0);
    // 5. Итоговая цена (как totalPrice)
    // Делим на 1000, чтобы получить литры
    const formattedSize = volue >= 1000 ? `${volue / 1000} л` : `${volue / 1000}`.replace('.', ',') + ' л';
    
    return gigienPrice + totalCountProductPrice;


}