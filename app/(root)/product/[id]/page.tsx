// app/product/[id]/page.tsx
import { Container, ProductForm } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";


export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    // 1. Обязательно "ждем" параметры
    const { id } = await params;
    // 2. Ищем продукт
    const product = await prisma.product.findFirst({ where: { id: Number(id) }, include: {
        countProduct: true,
        category: {
            include: {
                 product: {
                    include: {
                        items: true,
                    },
                },
            },
        },
        items: true,
    }});
    // 3. Если продукта нет, лучше сразу показать 404
    if (!product) {
        return notFound();
    }
   
    return (
    <Container className="flex flex-col my-10">
        <ProductForm product={product}/>
    </Container>
    )
}