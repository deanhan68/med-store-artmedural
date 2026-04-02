import { Api } from "@/shared/services/api-client";
import { CountProduct } from "@prisma/client";
import React from "react";

export const useQuantiti = () => {
    const [quantiti, setQuantiti] = React.useState<CountProduct[]>([]);
    const [loading, setLoading] = React.useState(true);


    React.useEffect(() => {
        async function fetchCountProduct() {
            try {
                setLoading(true);
                const quantiti = await Api.countProduct.getAll();
                setQuantiti(quantiti);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }

        }

        fetchCountProduct();


    },[])

    return {quantiti, loading};
}