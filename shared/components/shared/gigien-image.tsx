'use client';

import { cn } from "@/shared/lib/utils";
import React from "react";

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
            {/* Синий бейдж удален, теперь всё чисто */}
            <img
                src={imageUrl}
                alt="product"
                className={cn(
                    'relative transition-all duration-500 ease-in-out z-10 object-contain',
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