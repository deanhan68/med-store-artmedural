import Link from 'next/link';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { Plus } from 'lucide-react';
import { cn } from '@/shared/lib/utils'; // Добавил импорт cn на всякий случай
import { CountProduct } from '@prisma/client';

interface Props {
    id: number;
    name: string;
    price: number;
    count?: number;
    imageUrl: string;
    quantiti: CountProduct[];
    className?: string;

}

export const ProductCard: React.FC<Props> = ({ id, name, price, imageUrl, quantiti, className }) => {
  return (
    // Добавляем h-full, чтобы все карточки в ряду были одной высоты
    <div className={cn("flex flex-col h-full", className)}>
        <Link href={`/product/${id}`} className="flex flex-col flex-1">
            <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
                <img className="w-[215px] h-[215px] object-contain" src={imageUrl} alt={name} />
            </div>

            {/* Контейнер для текстового контента делаем flex-1 */}
            <div className="flex flex-col flex-1 mt-3">
                {/* Ограничиваем высоту заголовка (напр. 2 строки), чтобы он не прыгал */}
                <Title text={name} size="sm" className="mb-1 font-bold line-clamp-2 min-h-[40px]" />

                <p className="text-sm text-gray-400 line-clamp-3 flex-1">
                    {
                        quantiti.map((quant) => (
                            quant.name
                        )).join(", ")
                    }
                </p>

                {/* Этот блок теперь всегда будет в самом низу благодаря flex-1 выше */}
                <div className="flex justify-between items-center mt-5">
                    <span className="text-[20px]">
                        от <b>{price} ₽</b>
                    </span>

                    <Button variant="secondary" className="text-base font-bold">
                        <Plus size={20} className="mr-1" />
                        Добавить
                    </Button>
                </div>
            </div>
        </Link>
    </div>
  );
};