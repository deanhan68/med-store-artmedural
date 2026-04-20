'use client';
import React, { PropsWithChildren } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/shared/components/ui/sheet"

import Image from 'next/image';
import Link from "next/link";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib";
import { GigienType, GigienVolue } from "@/shared/constants/gigien";
import { Title } from "./title";
import { useCart } from "@/shared/hooks";


export const CartDrawer: React.FC<PropsWithChildren> = ({ children }) => {
    const { totalAmount, updateItemQuantity, items, removeCartItem} = useCart();
    const [redirecting, setRedirecting] = React.useState(false);
    

    

    const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    }

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col justify-between pb-0 sm:max-w-[30%] bg-[#EEF1F4]">
                <SheetHeader>
                    <SheetTitle>
                        {totalAmount > 0 
                            ? <>В корзине <span className="font-bold">{items.length} товара</span></>
                            : 'Корзина пуста'}
                    </SheetTitle>
                </SheetHeader>

                {/* 2. Состояние ПУСТОЙ корзины */}
                {!totalAmount && (
                    <div className="flex flex-col items-center justify-center flex-1">
                        <Image src="/empty-box.png" alt="empty cart" width={160} height={160} />
                        <Title size='sm' text="Корзина пустая" className="text-center font-bold my-2" />
                        <p className="text-center text-neutral-500 mb-5">
                            Добавьте хотя бы один продукт, чтобы совершить заказ
                        </p>

                        {/* Используем SheetClose, чтобы кнопка закрывала шторку */}
                        <SheetClose asChild>
                            <Button className="w-56 h-12 text-base" size="lg">
                                <ArrowLeft className="w-10 mr-2 " /> 
                                Вернуться назад
                            </Button>
                        </SheetClose>
                    </div>
                )}
                {/* 3. Состояние КОРЗИНЫ С ТОВАРАМИ */}
                {totalAmount > 0 && (
                    <>
                        <div className="mt-5 overflow-auto flex-1">
                            <div className="flex flex-col gap-2 mb-2">
                                {items.map((item) => (
                                    <CartDrawerItem
                                        key={item.id}
                                        id={item.id}
                                        imageUrl={item.imageUrl}
                                        details={getCartItemDetails(item.countProduct, item.productType as GigienType, item.productSize as GigienVolue)}
                                        disabled={item.disabled}
                                        name={item.name}
                                        price={item.price}
                                        quantity={item.quantity}
                                        onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                                        onClickRemove={() => removeCartItem(item.id)}
                                    />
                                ))}
                            </div>
                        </div>

                        <SheetFooter className="bg-white p-8">
                            <div className="w-full">
                                <div className="flex mb-4">
                                    <span className="flex flex-1 text-lg text-neutral-500">
                                        Итого
                                        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                                    </span>
                                    <span className="font-bold text-lg">{totalAmount} ₽</span>
                                </div>

                                <Link href='/checkout'>
                                    <Button onClick={() => setRedirecting(true)} loading={redirecting} type="submit" className="w-full h-12 text-base">
                                        Оформить заказ
                                        <ArrowRight className="w-5 ml-12" />
                                    </Button>
                                </Link>
                            </div>
                        </SheetFooter>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
};