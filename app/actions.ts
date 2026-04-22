'use server';

import { prisma } from '@/prisma/prisma-client';
import { PayOrderTemplate } from '@/shared/components/shared/email-templates';
import { CheckoutFormValues } from '@/shared/constants';
import { sendEmail } from '@/shared/lib';
import { OrderStatus } from '@prisma/client';
import { cookies } from 'next/headers';
import React from 'react';

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = await cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token not found');
    }

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

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    await prisma.cart.update({
      where: { id: userCart.id },
      data: { totalAmount: 0 },
    });

    await prisma.cartItem.deleteMany({
      where: { cartId: userCart.id },
    });

    try {
      await sendEmail(
        data.email,
        `ArtMedUral | Оплатите заказ №${order.id}!`,
        React.createElement(PayOrderTemplate, {
          orderId: order.id,
          totalAmount: order.totalAmount,
          paymentUrl: 'https://resend.com/docs/send-with-nextjs',
          items: userCart.items,
        })
      );
    } catch (error) {
      console.error('[EMAIL_ERROR]', error);
    }

    return 'https://resend.com/docs/send-with-nextjs';

  } catch (err) {
    console.log('[createOrder] Server error', err);
    throw err; 
  }
}