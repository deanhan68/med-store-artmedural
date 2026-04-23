import Link from 'next/link';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { Plus } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
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
    <div
      className={cn(
        'flex flex-col h-full bg-white rounded-3xl border border-gray-200 shadow-sm transition-all duration-300 group hover:shadow-xl hover:border-primary/20',
        className,
      )}>
      <Link href={`/product/${id}`} className="flex flex-col flex-1 p-3">
        <div className="flex justify-center p-4 bg-[#f9fafb] rounded-2xl h-[260px] overflow-hidden">
          <img
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            src={imageUrl}
            alt={name}
          />
        </div>

        <div className="flex flex-col flex-1 mt-4 px-2">
          <Title
            text={name}
            size="sm"
            className="mb-1 font-bold line-clamp-2 min-h-[48px] text-gray-900"
          />

          <p className="text-[13px] text-gray-400 line-clamp-2 flex-1 leading-snug">
            {quantiti.map((quant) => quant.name).join(', ')}
          </p>

          <div className="flex items-center justify-between mt-5">
            <div className="flex items-baseline gap-1">
              <span className="text-sm text-gray-400">от</span>
              <span className="text-[22px] font-bold text-black">
                {price} ₽
              </span>
            </div>

            {/* Кнопка: теперь синеет только при наведении на САМУ кнопку */}
            <Button
              variant="secondary"
              className="text-sm font-bold h-10 px-4 transition-all duration-300 hover:bg-primary hover:text-white active:scale-95"
            >
              <Plus size={18} className="mr-1" />
              Добавить
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};