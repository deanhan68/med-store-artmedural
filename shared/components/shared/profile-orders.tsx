import React from 'react';

interface Props {
  orders: any[];
}

export const ProfileOrders: React.FC<Props> = ({ orders }) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-black mb-6 uppercase tracking-tighter">История заказов</h2>
      
      <div className="space-y-6">
        {orders.map((order) => {
          const items = JSON.parse(order.items as string);

          return (
            <div 
              key={order.id} 
              className="p-6 border-[3px] border-black rounded-[32px] bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              {/* ШАПКА ЗАКАЗА */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xl font-black uppercase tracking-tighter block">Заказ #{order.id}</span>
                  <p className="text-[10px] text-gray-400 font-black uppercase mt-1">
                    {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black tracking-tighter">{order.totalAmount} ₽</div>
                  <span className={`text-[10px] font-black uppercase px-4 py-1.5 rounded-full border-[3px] border-black inline-block mt-2 ${
                    order.status === 'SUCCEEDED' ? 'bg-[#bbf7d0]' : 'bg-gray-100'
                  }`}>
                    {order.status === 'SUCCEEDED' ? 'Оплачен' : 'В обработке'}
                  </span>
                </div>
              </div>

              {/* СПИСОК ТОВАРОВ */}
              <div className="border-t-[3px] border-black pt-5">
                <ul className="space-y-5">
                  {items.map((item: any, i: number) => (
                    <li key={i} className="flex flex-col">
                      <div className="flex justify-between items-baseline gap-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-black uppercase text-gray-800 leading-tight">
                             {item.productItem.product.name}
                          </span>
                          
                          {/* НОВОЕ СТИЛЬНОЕ ОПИСАНИЕ */}
                          {item.productItem.product.description && (
                            <p className="text-[10px] leading-tight text-gray-400 mt-1 max-w-[80%] italic">
                                {item.productItem.product.description.length > 80 
                                    ? item.productItem.product.description.substring(0, 80) + '...' 
                                    : item.productItem.product.description}
                            </p>
                          )}
                          
                          <span className="text-[11px] font-bold text-black/40 mt-2">
                             {item.quantity} шт. × {item.productItem.price} ₽
                          </span>
                        </div>
                        
                        <div className="flex-1 border-b-2 border-dotted border-black/10 min-w-[20px]" />
                        
                        <span className="text-sm font-black text-black">
                          {item.productItem.price * item.quantity} ₽
                        </span>
                      </div>

                      {/* ИНГРЕДИЕНТЫ/ДОПЫ */}
                      {item.ingredients && item.ingredients.length > 0 && (
                        <div className="mt-2 ml-2 flex flex-wrap gap-2">
                           {item.ingredients.map((ing: any) => (
                             <span key={ing.id} className="text-[9px] font-black bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md border border-blue-100 uppercase">
                               + {ing.name}
                             </span>
                           ))}
                        </div>
                      )}
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