import { CountProduct } from "@prisma/client"
import { Api } from "@/services/api-client";
import React from "react";
import { useSet } from "react-use";


interface ReturnProps {
    quantiti: CountProduct[];
    loading: boolean;
    selectedIds: Set<string>;
    onAddId  : (id: string) => void;
}



export const useFilterQuantiti = (): ReturnProps => {
    const [quantiti, setQuantiti] = React.useState<CountProduct[]>([]);
    const [loading, setLoading] = React.useState(true);

    const [selectedIds, {  toggle }] = useSet(new Set<string>([]));


    
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

    return {quantiti, loading, onAddId : toggle, selectedIds};
}