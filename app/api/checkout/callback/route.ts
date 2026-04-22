import { PaymentCallbackData } from '@/@types/yookassa';
import { prisma } from '@/prisma/prisma-client';
import { OrderSuccessTemplate } from '@/shared/components/shared/email-templates/order-success';
import { sendEmail } from '@/shared/lib';
import { OrderStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    // ОШИБКА 1: Тут должен быть return!
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const isSucceeded = body.object.status === 'succeeded';

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    // ОШИБКА 2: Распаковка товаров
    const items = (typeof order.items === 'string' 
      ? JSON.parse(order.items) 
      : order.items) as any[];

    if (isSucceeded) {
      try {
        await sendEmail(
          order.email,
          'ArtMedUral | Ваш заказ успешно оформлен!',
          OrderSuccessTemplate({
            orderId: order.id,
            items: items,
            totalAmount: order.totalAmount,
          }),
        );
      } catch (mailError) {
        console.log('[Email Error]:', mailError);
        // Не прерываем выполнение, даже если почта упала
      }
    }

    // ГЛАВНОЕ: Всегда возвращаем ответ ЮKassa
    return NextResponse.json({ success: true });

  } catch (error) {
    console.log('[Checkout Callback] Error:', error);
    // ОШИБКА 3: В блоке catch тоже нужен return!
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}