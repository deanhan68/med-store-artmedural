// app/product/[id]/page.tsx
import { Container, GigienImage, Title } from "@/shared/components/shared";
import { GroupVariants } from "@/shared/components/shared/group-variants";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    // 1. Обязательно "ждем" параметры
    const { id } = await params;

    // 2. Ищем продукт
    const product = await prisma.product.findFirst({ where: { id: Number(id) }});

    // 3. Если продукта нет, лучше сразу показать 404
    if (!product) {
        return notFound();
    }

    return (
    <Container className="flex  my-10">
        <div className="flex flex-1 ">
            <GigienImage imageUrl={product.imageUrl} size={500} />
        </div>

        <div className="w-[490px] bg-[#f7f6f5] p-7 ">
            <Title text={product.name} size="md" className="font-extrabold mb-1"/>
            <p className="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quaerat iure quasi debitis quod. Quo vel, dolore dolores deleniti porro maxime cumque,</p>
            <GroupVariants 
            value="2"
            items={[
                {
                    name:'Небольшой',
                    value: '1',
                },
                {
                    name:'Средний',
                    value: '2',
                },
                {
                    name:'Большой',
                    value: '3',
                    disabled:true,
                },
                
                ]}/>
        </div>
    </Container>
    )
}