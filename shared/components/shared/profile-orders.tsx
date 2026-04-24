import React from 'react';
import { OrderStatus } from '@prisma/client';

interface Props {
  orders: any[];
}

export const ProfileOrders: React.FC<Props> = ({ orders }) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-black mb-6">Последние 5 заказов</h2>
      
      <div className="space-y-6">
        {orders.map((order) => {
          const items = JSON.parse(order.items as string);

          return (
            <div 
              key={order.id} 
              className="p-6 border-[3px] border-black rounded-[32px] bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-lg font-black uppercase tracking-tighter">Заказ #{order.id}</span>
                  <p className="text-xs text-gray-400 font-bold">
                    {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black">{order.totalAmount} ₽</div>
                  <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border-2 border-black ${
                    order.status === 'SUCCEEDED' ? 'bg-[#bbf7d0]' : 'bg-gray-100'
                  }`}>
                    {order.status === 'SUCCEEDED' ? 'Оплачен' : 'В обработке'}
                  </span>
                </div>
              </div>

              <div className="border-t-2 border-black/5 pt-4">
                <ul className="space-y-1">
                  {items.map((item: any, i: number) => (
                    <li key={i} className="flex justify-between text-sm font-bold text-gray-600">
                      <span>{item.productItem.product.name} <span className="text-black/30">x{item.quantity}</span></span>
                      <span>{item.productItem.price * item.quantity} ₽</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};