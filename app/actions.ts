'use server';

import { prisma } from '@/prisma/prisma-client';
import { PayOrderTemplate } from '@/shared/components/shared/email-templates';
import { CheckoutFormValues } from '@/shared/constants';
import { createPayment, sendEmail } from '@/shared/lib';
import { OrderStatus } from '@prisma/client';
import { cookies } from 'next/headers';
import React from 'react';

// Константы такие же, как в твоем CheckoutSidebar
const DISCOUNT_PERCENT = 15;
const DELIVERY_PRICE = 250;

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = await cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    /* 1. Получаем корзину пользователя */
    const userCart = await prisma.cart.findFirst({
      where: { token: cartToken },
      include: {
        user: true,
        items: {
          include: {
            productItem: {
              include: { product: true },
            },
          },
        },
      },
    });

    if (!userCart || userCart.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    /* 2. Рассчитываем финальную сумму (как в сайдбаре) */
    const discountPrice = Math.round((userCart.totalAmount * DISCOUNT_PERCENT) / 100);
    const totalPrice = userCart.totalAmount - discountPrice + DELIVERY_PRICE;

    /* 3. Создаем заказ в базе данных */
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: totalPrice, // Теперь тут сумма со скидкой и доставкой
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    /* 4. Очищаем корзину после создания заказа */
    await prisma.cart.update({
      where: { id: userCart.id },
      data: { totalAmount: 0 },
    });

    await prisma.cartItem.deleteMany({
      where: { cartId: userCart.id },
    });

    /* 5. Создаем платеж в ЮKassa */
    const paymentData = await createPayment({
      amount: order.totalAmount, // Сюда улетит уже правильная сумма (totalPrice)
      orderId: order.id,
      description: 'Оплата заказа #' + order.id,
    });

    if (!paymentData) {
      throw new Error('Payment data not found');
    }

    /* 6. Сохраняем ID платежа в заказ для будущего отслеживания */
    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentId: paymentData.id,
      },
    });

    const paymentUrl = paymentData.confirmation.confirmation_url;

    /* 7. Отправляем письмо пользователю с кнопкой оплаты */
    await sendEmail(
      data.email,
      `ArtMedUral | Оплатите заказ №${order.id}!`,
      React.createElement(PayOrderTemplate, {
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl,
      })
    );

    /* 8. Возвращаем ссылку на ЮKassa для редиректа */
    return paymentUrl;

  } catch (err) {
    console.log('[createOrder] Server error', err);
    throw err;
  }
}