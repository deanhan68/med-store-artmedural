'use client';

import { cn } from "@/shared/lib/utils";
import React from "react";
import { Container } from "./container";
import Image from 'next/image'
import { Button } from "../ui/button";
import { User } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
import { useSearchParam } from "react-use";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";


interface Props {
    hasSearch?: boolean;
    hasCart?: boolean;
    className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, className, hasCart = true }) => {

    const searchParams = useSearchParams()

    React.useEffect(() => {
        console.log(searchParams.has('paid'), 999);
        if (searchParams.has("paid")) {
            setTimeout(() => {
                toast.success('Заказ оплачен, информация отправлена на почту.');
            }, 300)
            
        }
    }, [])
    return (
        <header className={cn('bg-white', className)}>
            <Container 
                className={cn(
                    "flex items-center justify-between py-8 gap-10",
                    /* 2. Если поиска нет (это страница корзины), добавляем бордер именно КОНТЕЙНЕРУ */
                    !hasSearch && "border-b border-b-gray-300"
                )}
            >
                {/* Левая часть: Логотип и Режим работы */}
                <div className="flex items-center gap-10">
                    <Link href="/">
                        <div className="flex items-center gap-3">
                            <Image src="/logo.png" alt="Logo" width={250} height={300} />
                        </div>
                    </Link>

                    <div className="hidden lg:block">
                        <p className="text-blue-800 text-sm font-semibold">Режим работы:</p>
                        <p className="text-xs text-orange-600 leading-5">Пн-Пт с 8:00 до 17:00</p>
                        <p className="text-xs text-orange-600">Сб-Вс Выходной</p>
                    </div>
                </div>

                {/* Центр: Поиск (если включен) */}
                {hasSearch && (
                    <div className="mx-10 flex-1">
                        <SearchInput />
                    </div>
                )}

                {/* Правая часть: Профиль и Корзина */}
                <div className={cn("flex items-center gap-3", !hasSearch && "ml-auto")}>
                    <Button variant="outline" className="flex items-center gap-2 rounded-2xl">
                        <User size={16} />
                        Войти
                    </Button>
                    {hasCart && <CartButton className="rounded-2xl" />}
                </div>

            </Container>
            
            {/* 3. Для главной страницы, где поиск ЕСТЬ, рисуем длинную линию под всем хедером */}
            {hasSearch && <div className="border-b border-b-gray-300 w-full" />}
        </header>
    ) 
}