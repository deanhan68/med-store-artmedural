import { cn } from "@/shared/lib/utils";
import { CircleCheck } from "lucide-react";
import React from "react";


interface Props {
    imageUrl: string;
    name:string;
    price:number;
    active?: boolean;
    onClick: () => void;
    className?: string;

}

export const QuantitiItem: React.FC<Props> = ({
    className,
    active,
    price,
    imageUrl,
    name,
    onClick,


}) => {
    return <div className={cn(
        'flex items-center flex-col p-0 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white',
        {'border border-primary':active},
        className
        )} 
        onClick={onClick}>
        { active && <CircleCheck className="absolute top-2 right-2 text-primary" />}
        <span className="text-base mb-1 mt-8">{name}</span>
        <span className="text-sm mb-1 font-semibold">{price} ₽</span>


    </div>
}