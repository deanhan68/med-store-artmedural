import { ProductItem } from "@prisma/client";
import { GigienType, gigienVolues } from "../constants/gigien";
import { Variant } from "../components/shared/group-variants";





export const getAvailableGigienVolues = (
    items: ProductItem[],
    gigienType: GigienType, 
): Variant[] => {
    const filteredGigiensByType = items.filter((item) => item.productType === gigienType);

    return  gigienVolues.map((vol) => ({
        name: vol.name,
        value: vol.value,
        disabled: !filteredGigiensByType.some((item) => Number(item.size) === Number(vol.value)),
      }));
}