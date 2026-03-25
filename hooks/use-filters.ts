import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import React from "react";


interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QeuryFilters extends PriceProps {
    sterTypes: string;
    volues: string;
    quantiti: string;
}

export interface Filters {
    volues: Set<string>;
    sterTypes: Set<string>;
    selectedCountProduct: Set<string>;
    prices: PriceProps;

}

interface ReturnProps extends Filters {
    setPrices: (name: keyof PriceProps, value: number) => void;
    setSterTypes: (key: string) => void;
    setVolues: (key: string) => void;
    setSelectedQuantiti: (key: string) => void;


}


export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as  Map<keyof QeuryFilters, string>; 


    /* Фильтр допов */
    const [selectedCountProduct, {  toggle : toggleQuantiti }] = useSet(
        new Set<string>(searchParams.get('quantiti')?.split(','))
        );
    
    /* Фильтр объема */
    const [volues, {  toggle : toggleVolues }] = useSet(new Set<string>(
        searchParams.has('volues') ? searchParams.get('volues')?.split(','): [])
        );
    
    /* Фильтр типа стерильности  */
    const [sterTypes, {toggle: toggleSterTypes}] = useSet(new Set<string>(
        searchParams.has('sterTypes') ? searchParams.get('sterTypes')?.split(','): [])
        );

    /* Фильтр стоимости */
    const [prices , setPrices] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
        });

    const updatePrice = (name : keyof PriceProps, value: number) => {
        setPrices((prev) => ({
            ...prev,
            [name] : value,
        }));
    };

    


    return {
        volues,
        sterTypes,
        selectedCountProduct,
        prices,
        setPrices: updatePrice,
        setSterTypes: toggleSterTypes,
        setVolues: toggleVolues,
        setSelectedQuantiti: toggleQuantiti,

    }
}