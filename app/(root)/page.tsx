import { Container, Filters, Title } from "@/shared/components/shared";
import { ProductsGroupList } from "@/shared/components/shared/product-group-list";
import { TopBar } from "@/shared/components/shared/top-bar";
import { Suspense } from "react";
import { findGigiens, GetSearchParams } from "@/shared/lib/find-gigiens";


export default async function Home({ searchParams }: { searchParams: Promise<GetSearchParams> }) {
  // ОБЯЗАТЕЛЬНО: ждем получения параметров из URL
  const params = await searchParams;
  
  // Передаем уже "готовые" параметры в функцию поиска
  const categories = await findGigiens(params);



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
            <Suspense><Filters/></Suspense>
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
