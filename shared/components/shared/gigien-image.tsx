import { cn } from "@/shared/lib/utils";
import React from "react";
import { mapGigienType, mapGigienVolue } from "@/shared/constants/gigien";


interface Props {
    className?: string;
    imageUrl: string;
    size?: 500 | 1000 | 2000;
}

export const GigienImage: React.FC<Props> = ({ imageUrl, size = 500, className }) => {
    return (
        <div className={cn(
            'flex items-center justify-center flex-1 relative w-full',
            className
        )}>

            {/* 🔥 БЕЙДЖ */}
            <div
                key={size}
                className="
                absolute top-6 left-8 z-20

                px-6 py-3 
                rounded-2xl 
            
                text-base font-semibold text-white
            
                bg-gradient-to-r from-blue-500 to-blue-600
            
                
            
                transition-all duration-300 ease-in-out
              "
                >
                {mapGigienVolue[size]}
            </div>


           


            <img
                src={imageUrl}
                alt="product"
                className={cn(
                    'relative transition-all duration-300 ease-in-out z-10 object-contain',
                    {
                        'w-[350px] h-[350px]': size === 500,
                        'w-[450px] h-[450px]': size === 1000,
                        'w-[550px] h-[550px]': size === 2000,
                    }
                )}
            />
        </div>
    );
};
