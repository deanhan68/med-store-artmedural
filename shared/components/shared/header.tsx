import { cn } from "@/shared/lib/utils";
import React from "react";
import { Container } from "./container";
import Image from 'next/image'
import { Button } from "../ui/button";
import { ArrowRight, MoveRight, ShoppingBasket, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";


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
                        
                    </div>
                </Link>
                <div className="mt-2 ml-3">
                            <p className="text-blue-800 leading-1">Режим работы:</p>
                            <p className="gap-1 text-sm text-orange-600 leading-9">Пн-Пт с 8:00 до 17:00</p>
                            <p className="gap-1 text-sm text-orange-600 leading-1">Сб-Вс Выходной</p>
                     </div>


                <div className="mx-10 flex-1"><SearchInput/></div>
                

                    
                 {/* Правая часть */}

                 <div className="flex items-center gap-3">
                <Button variant="outline" >
                    <User size = {16} className="flex items-center gap-3"/>
                    Войти
                </Button>
                <CartButton/>
                </div>
            </Container>
        </header>
    ) 
}