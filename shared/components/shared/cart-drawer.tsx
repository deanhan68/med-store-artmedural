'use client'
import React, { PropsWithChildren } from "react";
import { Button } from "../ui/button";
import { ArrowRight, ShoppingBasket } from "lucide-react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/shared/components/ui/sheet"

import Link from "next/link";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib";


interface Props {
    className?: string;
}

/* cn('flex items-center justify-center flex-1 relative w-full') */

export const CartDrawer: React.FC<PropsWithChildren<Props>> = ({ children, className}) => {
    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
                <SheetContent className="flex flex-col justify-between pb-0  sm:max-w-[30%] bg-[#F4F1EE]">
                    <SheetHeader>
                        <SheetTitle>
                            В корзине <span className="font-bold">3 товара</span>
                        </SheetTitle>
                    </SheetHeader>


                    <div className=" mt-5 overflow-auto flex-1">
                        <div className="mb-2">
                            <CartDrawerItem
                            id={1}
                            imageUrl={
                                "http://artmedural.ru/image/cache/catalog/tovar/t02/t28/680f8a4a9c911b5b9af5e551c02cb10d-1100x1100.jpg"
                            }
                            details={getCartItemDetails(2,1000,[{name: "С дозатором"}, {name: "Мерный стакан"}])}
                            name={'Кутасепт Ф'}
                            price={250}
                            quantity={1}
                            />
                        </div>
                        <div className="mb-2">
                            <CartDrawerItem
                            id={1}
                            imageUrl={
                                "http://artmedural.ru/image/cache/catalog/tovar/t02/t28/680f8a4a9c911b5b9af5e551c02cb10d-1100x1100.jpg"
                            }
                            details={getCartItemDetails(2,1000,[{name: "С дозатором"}, {name: "Мерный стакан"}])}
                            name={'Кутасепт Ф'}
                            price={250}
                            quantity={1}
                            />
                        </div>
                        <div className="mb-2">
                            <CartDrawerItem
                            id={1}
                            imageUrl={
                                "http://artmedural.ru/image/cache/catalog/tovar/t02/t28/680f8a4a9c911b5b9af5e551c02cb10d-1100x1100.jpg"
                            }
                            details={getCartItemDetails(2,1000,[{name: "С дозатором"}, {name: "Мерный стакан"}])}
                            name={'Кутасепт Ф'}
                            price={250}
                            quantity={1}
                            />
                        </div>
                        <div className="mb-2">
                            <CartDrawerItem
                            id={1}
                            imageUrl={
                                "http://artmedural.ru/image/cache/catalog/tovar/t02/t28/680f8a4a9c911b5b9af5e551c02cb10d-1100x1100.jpg"
                            }
                            details={getCartItemDetails(2,1000,[{name: "С дозатором"}, {name: "Мерный стакан"}])}
                            name={'Кутасепт Ф'}
                            price={250}
                            quantity={1}
                            />
                        </div>
                        <div className="mb-2">
                            <CartDrawerItem
                            id={1}
                            imageUrl={
                                "http://artmedural.ru/image/cache/catalog/tovar/t02/t28/680f8a4a9c911b5b9af5e551c02cb10d-1100x1100.jpg"
                            }
                            details={getCartItemDetails(2,1000,[{name: "С дозатором"}, {name: "Мерный стакан"}])}
                            name={'Кутасепт Ф'}
                            price={250}
                            quantity={1}
                            />
                        </div>
                        <div className="mb-2">
                            <CartDrawerItem
                            id={1}
                            imageUrl={
                                "http://artmedural.ru/image/cache/catalog/tovar/t02/t28/680f8a4a9c911b5b9af5e551c02cb10d-1100x1100.jpg"
                            }
                            details={getCartItemDetails(2,1000,[{name: "С дозатором"}, {name: "Мерный стакан"}])}
                            name={'Кутасепт Ф'}
                            price={250}
                            quantity={1}
                            />
                        </div>

                    </div>
                
                    <SheetFooter className=" bg-white p-8">
                        <div className="w-full">
                            <div className="flex mb-4">
                                <span className="flex flex-1 text-lg text-neutral-500">
                                    Итого
                                    <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"/>
                                </span>

                                <span className="font-bold text-lg">500 ₽</span>
                            </div>

                            <Link href='/cart'>
                                <Button
                                    type="submit"
                                    className="w-full h-12 text-base">
                                        Оформить заказ
                                    <ArrowRight className="w-5 ml-12"/>
                                </Button>
                            </Link>
                        </div>
                    </SheetFooter>
                </SheetContent>
        </Sheet>
        

        

    )
}