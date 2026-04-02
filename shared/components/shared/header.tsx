import { cn } from "@/shared/lib/utils";
import React from "react";
import { Container } from "./container";
import Image from 'next/image'
import { Button } from "../ui/button";
import { ArrowRight, MoveRight, ShoppingBasket, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";


interface Props {

    className?: string;
}

export const Header: React.FC<Props> = ({className}) => {
    return (
        <header className= {cn('border border-b ',className)}>
            <Container className="flex items-center justify-between py-8">

                {/* Левая часть */}

                <Link href="/">
                    <div className="flex item-center gap-3">
                        <Image src="/logo.png" alt="Logo" width={250} height={300}/>
                        <div className="mt-2">
                            <p className="text-blue-800 leading-1">Режим работы:</p>
                            <p className="gap-1 text-sm text-orange-600 leading-9">Пн-Пт с 8:00 до 17:00</p>
                            <p className="gap-1 text-sm text-orange-600 leading-1">Сб-Вс Выходной</p>
                        </div>
                    </div>
                </Link>


                <div className="mx-10 flex-1"><SearchInput/></div>
                

                    
                 {/* Правая часть */}

                 <div className="flex items-center gap-3">
                    
                    

                <Button variant="outline" >
                    <User size = {16} className="flex items-center gap-3"/>
                    Войти
                </Button>

                <div>
                    <Button className="group relative">
                        <b>520 ₽</b>
                        <span className="h-full w-[1px] bg-white/30 mx-3"></span>
                        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                            <ShoppingBasket className="h-4 w-4 relative" strokeWidth={2}/>
                            <b>3</b>
                        </div>
                        <ArrowRight size = {20} className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"/>
                    </Button>
                </div>
                </div>
            </Container>
        </header>
    ) 
}