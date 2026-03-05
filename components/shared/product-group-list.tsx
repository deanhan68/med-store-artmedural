import React from 'react';
import { Title } from './title';
import { ProductCard } from './product-card';

interface Props {
  title: string;
  items: any[];
  className?: string;
}

export const ProductsGroupList: React.FC<Props> = ({ title, items, className }) => {
  return (
    <div className={className}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className="grid grid-cols-3 gap-[50px]">
        {items.map((item, i) => (
          <ProductCard
            key={item.id}
            name="BENOVY LATEX CHLORINATED"
            imageUrl="http://artmedural.ru/image/cache/catalog/tovar/t02/t28/avansept-1100x1100.jpg"
            price={390}
            count={i % 2} id={0}          />
        ))}
      </div>
    </div>
  );
};
