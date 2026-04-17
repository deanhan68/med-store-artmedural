import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { error } from "console";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        // 1. Извлекаем ID из асинхронных параметров (фишка Next.js 15)
        const { id: routeId } = await params;
        const id = Number(routeId);

        // 2. Получаем количество из тела запроса
        const data = (await req.json()) as { quantity: number };

        // 3. Достаем токен (из кук или из заголовков для удобства теста в Postman)
        const token = req.cookies.get('cartToken')?.value || req.headers.get('cart-token');

        if (!token) {
            return NextResponse.json({ message: "Токен корзины не найден" }, { status: 400 });
        }

        if (isNaN(id)) {
            return NextResponse.json({ message: "Некорректный ID товара" }, { status: 400 });
        }

        // 4. Обновляем количество в базе данных
        await prisma.cartItem.update({
            where: { id },
            data: { quantity: data.quantity },
        });

        // 5. Пересчитываем общую сумму через твою функцию
        const updatedUserCart = await updateCartTotalAmount(token);

        // Возвращаем обновленную корзину
        return NextResponse.json(updatedUserCart);

    } catch (error) {
        console.error('[CART_PATCH] Server error:', error);
        return NextResponse.json({ message: "Не удалось обновить корзину" }, { status: 500 });
    }
}




export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        // 1. Обязательно дожидаемся params!
        const { id: routeId } = await params;
        const id = Number(routeId);
        
        const token = req.cookies.get('cartToken')?.value;
    
        if (!token) {
            return NextResponse.json({ error: "Cart token not found" }, { status: 400 });
        }

        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        // 2. Проверяем, существует ли товар, прежде чем удалять
        const cartItem = await prisma.cartItem.findFirst({
            where: { id },
        });

        if (!cartItem) {
            return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
        }

        // 3. Удаляем товар
        await prisma.cartItem.delete({
            where: { id },
        });

        // 4. Пересчитываем сумму и возвращаем обновленную корзину
        const updatedUserCart = await updateCartTotalAmount(token);
        return NextResponse.json(updatedUserCart);

    } catch (error) {
        console.log('[CART_DELETE] Server error', error);
        return NextResponse.json({ message: 'Не удалось удалить товар' }, { status: 500 });
    }  
}