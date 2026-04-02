import { Container, Filters, Title } from "@/shared/components/shared";
import { ProductsGroupList } from "@/shared/components/shared/product-group-list";
import { TopBar } from "@/shared/components/shared/top-bar";
import { prisma } from "@/prisma/prisma-client";


export default async function Home() {

  const categories = await prisma.category.findMany({
    include : {
      product: {
        include : {
          countProduct: true,
          items: true,
        },
      },
    }
  })



  const newLocal = "flex flex-col gap-16";

  return (
    <>
      <Container className="mt-8">
        <Title text="Вся продукция" size="lg" className="font-extrabold"/>
      </Container>

      <TopBar categories={categories.filter((category) => category.product.length > 0)}/>

      <Container className="mt-8 pb-14">
        <div className="flex gap-[80px]">

          {/* Фильтрация */}
          <div className="w-[250px]">
            <Filters/>
          </div>



          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {
                categories.map((category) => (
                  category.product.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.product}
                    />
                  )
                ))
              }
            </div>
          </div>
        </div>
      </Container>
     </>
  )

}
