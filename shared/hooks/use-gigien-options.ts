import React from "react";
import { Variant } from "../components/shared/group-variants";
import { GigienType, GigienVolue } from "../constants/gigien";
import { ProductItem } from "@prisma/client";
import { useSet } from "react-use";
import { getAvailableGigienVolues } from "../lib";



interface ReturnProps {
  volue: GigienVolue,
  gigienType: GigienType,
  selectedCountProducts: Set<number>;
  availableVolues: Variant[];
  setVolue: (volue: GigienVolue) => void;
  setGigienType: (volue: GigienType) => void;
  addQuantiti:(id: number) => void;
 
}


export const useGigienOptions = (items: ProductItem[]): ReturnProps => {
    const [volue, setVolue] = React.useState<GigienVolue>(items[0]?.size as GigienVolue || 500);
    const [gigienType, setGigienType] = React.useState<GigienType>(1)
    const [selectedCountProducts, {toggle : addQuantiti}] = useSet(new Set<number>([]))

    const availableVolues = getAvailableGigienVolues(items, gigienType);
 
    React.useEffect(() => {
        const availableVolue = availableVolues.find((item) => !item.disabled);
        const isCurrentDisabled = availableVolues.find(item => Number(item.value) === volue)?.disabled;

        if (isCurrentDisabled && availableVolue) {
          setVolue(Number(availableVolue.value) as GigienVolue);
        }
      }, [gigienType]);

      return {
        volue,
        gigienType,
        selectedCountProducts,
        availableVolues,
        setVolue,
        setGigienType,
        addQuantiti,

      };
}