'use server';

import { prisma } from '@/prisma/prisma-client';
import { PayOrderTemplate } from '@/shared/components/shared/email-templates';
import { VerificationUserTemplate } from '@/shared/components/shared/email-templates/verification-user';
import { CheckoutFormValues } from '@/shared/constants';
import { createPayment, sendEmail } from '@/shared/lib';
import { getUserSession } from '@/shared/lib/get-user-session';
import { OrderStatus, Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import React from 'react';

const DISCOUNT_PERCENT = 15;
const DELIVERY_PRICE = 250;

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = await cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    const session = await getUserSession();
    const userId = session ? Number(session.id) : null;

    /* 1. Получаем корзину со всеми данными продукта (включая описание) */
    const userCart = await prisma.cart.findFirst({
      where: { token: cartToken },
      include: {
        user: true,
        items: {
          include: {
            productItem: {
              include: { product: true },
            },
            countProduct: true,
          },
        },
      },
    });

    if (!userCart || userCart.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    const discountPrice = Math.round((userCart.totalAmount * DISCOUNT_PERCENT) / 100);
    const totalPrice = userCart.totalAmount - discountPrice + DELIVERY_PRICE;

    /* 2. Создаем заказ */
    const order = await prisma.order.create({
      data: {
        userId, 
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: totalPrice,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items), // Здесь теперь лежит и product.description
      },
    });

    /* 3. Очистка корзины */
    await prisma.cart.update({
      where: { id: userCart.id },
      data: { totalAmount: 0 },
    });

    await prisma.cartItem.deleteMany({
      where: { cartId: userCart.id },
    });

    /* 4. Платеж и Email */
    const paymentData = await createPayment({
      amount: order.totalAmount,
      orderId: order.id,
      description: 'Оплата заказа #' + order.id,
    });

    if (!paymentData) throw new Error('Payment data not found');

    await prisma.order.update({
      where: { id: order.id },
      data: { paymentId: paymentData.id },
    });

    const paymentUrl = paymentData.confirmation.confirmation_url;

    await sendEmail(
      data.email,
      `ArtMedUral / Оплатите заказ №${order.id}!`,
      React.createElement(PayOrderTemplate, {
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl,
      })
    );

    return paymentUrl;
  } catch (err) {
    console.log('[createOrder] Server error', err);
    throw err;
  }
}

export async function deleteOrder(id: number) {
  try {
    const session = await getUserSession();
    if (!session) throw new Error('Не авторизован');

    await prisma.order.delete({
      where: { id, userId: Number(session.id) },
    });

    revalidatePath('/profile'); // Мгновенно обновляем страницу
  } catch (err) {
    console.log('Error [DELETE_ORDER]', err);
    throw err;
  }
}

export async function clearOrderHistory() {
  try {
    const session = await getUserSession();
    if (!session) throw new Error('Не авторизован');

    await prisma.order.deleteMany({
      where: { userId: Number(session.id) },
    });

    revalidatePath('/profile');
  } catch (err) {
    console.log('Error [CLEAR_HISTORY]', err);
    throw err;
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) throw new Error('Пользователь не найден');

    const findUser = await prisma.user.findFirst({
      where: { id: Number(currentUser.id) },
    });

    await prisma.user.update({
      where: { id: Number(currentUser.id) },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
      },
    });
    revalidatePath('/profile');
  } catch (err) {
    console.log('Error [UPDATE_USER]', err);
    throw err;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({ where: { email: body.email } });
    if (user) {
      if (!user.verified) throw new Error('Почта не подтверждена');
      throw new Error('Пользователь уже существует');
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    await prisma.verificationCode.create({
      data: { code, userId: createdUser.id },
    });

    await sendEmail(
      createdUser.email,
      `ArtMedUral / 📝 Подтверждение регистрации`,
      VerificationUserTemplate({ code }),
    );
  } catch (err) {
    console.log('Error [CREATE_USER]', err);
    throw err;
  }
}