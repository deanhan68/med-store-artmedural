import { CountProduct } from "@prisma/client"
import { Api } from "@/services/api-client";
import React from "react";


interface ReturnProps {
    quantiti: CountProduct[];
}



export const useFilterQuantiti = (): ReturnProps => {
    const [quantiti, setQuantiti] = React.useState<CountProduct[]>([]);
    
    React.useEffect(() => {
        async function fetchCountProduct() {
            try {
                const quantiti = await Api.countProduct.getAll();
                setQuantiti(quantiti);
            } catch (error) {
                console.log(error)
            }
        }

        fetchCountProduct();


    },[])

    return {quantiti};
}