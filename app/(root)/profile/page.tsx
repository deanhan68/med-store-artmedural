import { prisma } from '@/prisma/prisma-client';
import { ProfileForm } from '@/shared/components';
import { getUserSession } from '@/shared/lib/get-user-session';
import { redirect } from 'next/navigation';
import { Container } from '@/shared/components/shared';
import { clearOrderHistory, deleteOrder } from '@/app/actions';
import { Trash2, X } from 'lucide-react';
import Link from 'next/link';

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
    <Container className="my-10 px-5">
      <ProfileForm data={user} />

      <div className="mt-12 w-full">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#1a1a1a]">Последние 5 заказов</h2>
            
            {user.orders.length > 0 && (
              <form action={clearOrderHistory}>
                <button 
                  type="submit"
                  className="flex items-center gap-2.5 text-sm font-bold text-red-500 hover:bg-red-50 px-5 py-2.5 rounded-2xl border-2 border-red-200 transition-all active:scale-95 "
                >
                  <Trash2 size={18} strokeWidth={2.5} />
                  Очистить всё
                </button>
              </form>
            )}
          </div>

          {user.orders.length > 0 ? (
            <div className="flex flex-col gap-6">
              {user.orders.map((order, index) => {
                const items = JSON.parse(order.items as string);
                const displayOrderNumber = user.orders.length - index;

                return (
                  <div 
                    key={order.id} 
                    className="relative p-8 border-[3px] border-gray-200 rounded-[28px] bg-white transition-all duration-300 ease-in-out hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.08)] hover:-translate-y-0.5"
                  >
                    <form action={async () => {
                      'use server';
                      await deleteOrder(order.id);
                    }} className="absolute top-5 right-5 z-10">
                      <button type="submit" className="text-gray-300 hover:text-red-500 transition-colors p-1 active:scale-90">
                        <X size={20} strokeWidth={2.5} />
                      </button>
                    </form>

                    <div className="flex justify-between items-center mb-6 pr-10">
                      <div>
                        <span className="text-xl font-bold text-gray-900">Заказ №{displayOrderNumber}</span>
                        <p className="text-[13px] text-gray-400 mt-1 font-medium">
                          {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-2xl font-bold text-gray-900 leading-tight">{order.totalAmount} ₽</div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg border-2 mt-2 inline-block ${
                          order.status === 'SUCCEEDED' 
                            ? 'bg-green-50 text-green-600 border-green-200' 
                            : 'bg-yellow-50 text-yellow-600 border-yellow-200'
                        }`}>
                          {order.status === 'SUCCEEDED' ? 'Оплачен' : 'В обработке'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t-[3px] border-gray-200">
                      {items.map((item: any, i: number) => {
                        const addons = item.countProduct || []; 
                        const addonsPrice = addons.reduce((acc: number, ad: any) => acc + (ad.price || 0), 0);
                        const totalItemPrice = (item.productItem.price + addonsPrice) * item.quantity;

                        return (
                          /* КЛИКАБЕЛЬНАЯ ССЫЛКА НА ПРОДУКТ */
                          <Link 
                            key={i} 
                            href={`/product/${item.productItem.product.id}`}
                            /* ЧЕТКОЕ ГОЛУБОВАТОЕ ЗАТЕМНЕНИЕ ПРИ НАВЕДЕНИИ, БЕЗ РАМОК */
                            className="block group rounded-2xl transition-all duration-200 hover:bg-blue-100/40 active:scale-[0.99] active:bg-blue-100/60"
                          >
                            <div className="flex flex-col border-b-[3px] border-gray-100 last:border-none p-5 last:pb-0">
                              <div className="flex items-center gap-6">
                                <img 
                                  src={item.productItem.product.imageUrl} 
                                  alt={item.productItem.product.name}
                                  className="w-20 h-20 object-contain rounded-xl border-2 border-gray-300 flex-shrink-0 bg-white p-2"
                                />

                                <div className="flex justify-between items-center w-full">
                                  <div className="flex flex-col flex-1">
                                    <span className="text-[16px] font-semibold text-gray-800 leading-tight group-hover:text-blue-700 transition-colors">
                                      {item.productItem.product.name}
                                    </span>
                                    
                                    <div className="flex items-center gap-3 mt-2">
                                      <span className="text-[11px] font-bold text-gray-500 bg-white px-2 py-0.5 rounded-md border border-gray-200">
                                        {item.quantity} шт.
                                      </span>
                                      <span className="text-[11px] text-gray-300 font-medium italic underline decoration-gray-200 underline-offset-4 group-hover:decoration-blue-200 transition-colors">
                                        {item.productItem.price} ₽/ед.
                                      </span>
                                    </div>
                                  </div>
                                  <span className="text-xl font-bold text-gray-900 ml-4 group-hover:text-blue-800 transition-colors">
                                    {totalItemPrice} ₽
                                  </span>
                                </div>
                              </div>

                              {addons.length > 0 && (
                                <div className="mt-3 ml-[104px] flex flex-wrap gap-2 pr-4">
                                  {addons.map((ad: any, idx: number) => (
                                    <div key={idx} className="flex items-center bg-blue-50 border-2 border-blue-100 px-2.5 py-0.5 rounded-lg ">
                                      <span className="text-[10px] font-bold text-blue-600/80">
                                        + {ad.name}
                                      </span>
                                      <span className="text-[10px] ml-1.5 font-bold text-blue-600/30">
                                        {ad.price} ₽
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-20 border-2 border-dashed border-gray-300 rounded-[28px] text-center bg-gray-50/30">
              <p className="text-gray-400 font-medium italic">История заказов пока пуста</p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}