
import { cn } from "@/shared/lib/utils";
import React from "react";


interface Props {
    className?: string;
    imageUrl: string;
    size?: 30;
}

/* cn('flex items-center justify-center flex-1 relative w-full') */

export const ProductDefaultImage: React.FC<Props> = ({imageUrl, size, className}) => {
    return (
        <div className={cn('flex items-center justify-center flex-1 relative w-full', className) }>
            <img
            src={imageUrl}
            alt="logo"
            className={cn('relative  transition-all z-10 duration-300 object-contain', {
                'w-[400px] h-[400px]' : size === 30,
            })}
            />
        </div>
        
        
        
        

    )
}