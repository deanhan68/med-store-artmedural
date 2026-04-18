import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
    query?: string;
    sortBy?: string;
    volues?: string;    
    sterTypes?: string; 
    quantiti?: string;  
    priceFrom?: string;
    priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 30000;

export const findGigiens = async (params: GetSearchParams) => {
    // Мапим значения из URL в массивы чисел
    const volues = params.volues?.split(',').map(Number);
    const sterTypes = params.sterTypes?.split(',').map(Number);
    const quantitiIdArr = params.quantiti?.split(',').map(Number);

    const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
    const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

    const categories = await prisma.category.findMany({
        include: {
            product: {
                orderBy: { id: 'desc' },
                where: {
                    // 1. Фильтр по "Дополнительно" (связь с таблицей CountProduct)
                    countProduct: quantitiIdArr ? {
                        some: { id: { in: quantitiIdArr } },
                    } : undefined,
                    
                    // 2. Фильтр по таблице ProductItem (то, что на скрине)
                    items: {
                        some: {
                            price: { gte: minPrice, lte: maxPrice },
                            size: volues ? { in: volues } : undefined, // Сверяем с колонкой size
                            productType: sterTypes ? { in: sterTypes } : undefined, // Сверяем с колонкой productType
                        }
                    }
                },
                include: {
                    countProduct: true,
                    items: {
                        where: {
                            price: { gte: minPrice, lte: maxPrice }
                        },
                        orderBy: { price: 'asc' }
                    },
                },
            },
        }
    });

    return categories;
};