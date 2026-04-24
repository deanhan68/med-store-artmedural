import { prisma } from '@/prisma/prisma-client';
import { ProfileForm } from '@/shared/components';
import { getUserSession } from '@/shared/lib/get-user-session';
import { redirect } from 'next/navigation';
import { Container } from '@/shared/components/shared';
import { clearOrderHistory, deleteOrder } from '@/app/actions';
import { Trash2, X } from 'lucide-react';

export default async function ProfilePage() {
  const session = await getUserSession();

  if (!session) return redirect('/not-auth');

  const user = await prisma.user.findFirst({
    where: { id: Number(session.id) },
    include: {
      orders: {
        orderBy: { createdAt: 'desc' },
        take: 5, 
      },
    },
  });

  if (!user) return redirect('/not-auth');

  return (
    <Container className="my-10">
      <ProfileForm data={user} />

      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#1a1a1a]">Последние 5 заказов</h2>
          
          {user.orders.length > 0 && (
            <form action={clearOrderHistory}>
              <button 
                type="submit"
                className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl border border-red-100"
              >
                <Trash2 size={16} />
                Очистить всё
              </button>
            </form>
          )}
        </div>

        {user.orders.length > 0 ? (
          <div className="space-y-6">
            {user.orders.map((order, index) => {
              const items = JSON.parse(order.items as string);
              const displayOrderNumber = user.orders.length - index;

              return (
                <div 
                  key={order.id} 
                  className="relative p-6 border-[3px] border-gray-100 rounded-[24px] bg-white transition-all duration-300 ease-in-out hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                >
                  {/* Удаление одного заказа */}
                  <form action={async () => {
                    'use server';
                    await deleteOrder(order.id);
                  }} className="absolute top-4 right-4">
                    <button type="submit" className="text-gray-300 hover:text-red-500 transition-colors p-1">
                      <X size={20} strokeWidth={3} />
                    </button>
                  </form>

                  <div className="flex justify-between items-center mb-5 pr-8">
                    <div>
                      <span className="text-lg font-bold text-gray-900">Заказ №{displayOrderNumber}</span>
                      <p className="text-[13px] text-gray-400 mt-1 font-medium">
                        {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-xl font-bold text-gray-900">{order.totalAmount} ₽</div>
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                        order.status === 'SUCCEEDED' 
                          ? 'bg-green-50 text-green-600 border-green-100' 
                          : 'bg-gray-50 text-gray-500 border-gray-100'
                      }`}>
                        {order.status === 'SUCCEEDED' ? 'Оплачен' : 'В обработке'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-5 pt-4 border-t-[2px] border-gray-50">
                    {items.map((item: any, i: number) => {
                      const addons = item.countProduct || []; 
                      const addonsPrice = addons.reduce((acc: number, ad: any) => acc + (ad.price || 0), 0);
                      const totalItemPrice = (item.productItem.price + addonsPrice) * item.quantity;

                      return (
                        <div key={i} className="flex flex-col border-b border-gray-50 last:border-none pb-4 last:pb-0">
                          <div className="flex justify-between items-start">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-gray-800 uppercase tracking-tight">
                                {item.productItem.product.name}
                              </span>
                              
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-[12px] text-gray-400 font-medium">
                                  Количество: {item.quantity} шт.
                                </span>
                                
                                {/* ТИП УПАКОВКИ (Берем из description продукта) */}
                                {item.productItem.product.description && (
                                  <span className="text-[11px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md font-bold border border-blue-100">
                                    {item.productItem.product.description}
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className="text-sm font-black text-gray-900">
                              {totalItemPrice} ₽
                            </span>
                          </div>

                          {addons.length > 0 && (
                            <div className="mt-2 ml-2 pl-3 border-l-2 border-blue-100 flex flex-col gap-1">
                              {addons.map((ad: any, idx: number) => (
                                <div key={idx} className="flex justify-between text-[11px] font-medium text-blue-600/80">
                                  <span>+ {ad.name}</span>
                                  <span>{ad.price} ₽</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 border-[3px] border-dashed border-gray-200 rounded-[24px] text-center bg-gray-50/30">
            <p className="text-gray-400 font-medium">История заказов пока пуста</p>
          </div>
        )}
      </div>
    </Container>
  );
}