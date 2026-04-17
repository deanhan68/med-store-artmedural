import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";

// Исправляем типизацию params на Promise
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        // 1. Извлекаем ID (теперь это работает, так как params: Promise)
        const { id: routeId } = await params;
        const id = Number(routeId);

        const data = (await req.json()) as { quantity: number };
        const token = req.cookies.get('cartToken')?.value;

        if (!token) {
            return NextResponse.json({ message: "Токен корзины не найден" }, { status: 400 });
        }

        if (isNaN(id)) {
            return NextResponse.json({ message: "Некорректный ID товара" }, { status: 400 });
        }

        await prisma.cartItem.update({
            where: { id },
            data: { quantity: data.quantity },
        });

        const updatedUserCart = await updateCartTotalAmount(token);
        return NextResponse.json(updatedUserCart);

    } catch (error) {
        console.error('[CART_PATCH] Server error:', error);
        return NextResponse.json({ message: "Не удалось обновить корзину" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: routeId } = await params;
        const id = Number(routeId);
        
        const token = req.cookies.get('cartToken')?.value;
    
        if (!token) {
            return NextResponse.json({ error: "Cart token not found" }, { status: 400 });
        }

        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: { id },
        });

        if (!cartItem) {
            return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
        }

        await prisma.cartItem.delete({
            where: { id },
        });

        const updatedUserCart = await updateCartTotalAmount(token);
        return NextResponse.json(updatedUserCart);

    } catch (error) {
        console.log('[CART_DELETE] Server error', error);
        return NextResponse.json({ message: 'Не удалось удалить товар' }, { status: 500 });
    }  
}