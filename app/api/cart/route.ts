import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { findOrCreateCart } from '@/shared/lib';
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto';
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        token,
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            countProduct: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.error('[CART_GET] Server error', error);
    return NextResponse.json({ message: 'Не удалось получить корзину' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);
    const data = (await req.json()) as CreateCartItemValues;

    // 1. Получаем ВСЕ товары из корзины с таким productItemId
    const cartItems = await prisma.cartItem.findMany({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
      },
      include: {
        countProduct: true,
      },
    });

    // 2. Ищем среди них тот, у которого набор допов В ТОЧНОСТИ совпадает с пришедшим
    const findCartItem = cartItems.find((item) => {
      // Собираем ID текущих допов в базе и сортируем их
      const currentItemIds = item.countProduct.map((cp) => cp.id).sort((a, b) => a - b);
      // Собираем ID допов из запроса и сортируем их
      const newItemIds = (data.countProduct || []).sort((a, b) => a - b);
      
      // Сравниваем два массива как строки
      return JSON.stringify(currentItemIds) === JSON.stringify(newItemIds);
    });

    if (findCartItem) {
      // Если нашли полное совпадение — обновляем количество
      await prisma.cartItem.update({
        where: { id: findCartItem.id },
        data: { quantity: findCartItem.quantity + 1 },
      });
    } else {
      // Если не нашли — создаем новую позицию
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          countProduct: { 
            connect: data.countProduct?.map((id) => ({ id })) 
          },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);
    const resp = NextResponse.json(updatedUserCart);
    
    resp.cookies.set('cartToken', token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
    });
    
    return resp;
  } catch (error) {
    console.error('[CART_POST] Server error', error);
    return NextResponse.json({ message: 'Не удалось добавить товар в корзину' }, { status: 500 });
  }
}