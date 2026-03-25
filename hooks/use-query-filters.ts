import React from "react";
import { Filters } from "./use-filters";
import qs from "qs";
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
    const router = useRouter();

    React.useEffect(() => {
        // Создаем таймер: выполнится через 300мс после последнего изменения
        const timeout = setTimeout(() => {
            const params = {
                ...filters.prices,
                sterTypes: Array.from(filters.sterTypes),
                volues: Array.from(filters.volues),
                quantiti: Array.from(filters.selectedCountProduct),
            };

            const query = qs.stringify(params, {
                arrayFormat: "comma",
            });

            router.push(`?${query}`, {
                scroll: false
            });
            
            console.log('✅ URL обновлен (запрос отправлен)');
        }, 300); // 300мс — золотой стандарт для фильтров

        // Важнейшая часть: если данные изменились быстрее чем через 300мс, 
        // мы удаляем старый таймер и запускаем новый.
        return () => clearTimeout(timeout);

    }, [filters.prices, filters.sterTypes, filters.volues, filters.selectedCountProduct, router]);
}