import { CountProduct, Product, ProductItem } from "@prisma/client";

export type ProductWithRelations = Product & {items: ProductItem[]; countProduct: CountProduct[]};


