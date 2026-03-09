import { Categories, CheckboxFiltersGroup, Container, Filters, SortPopup, Title } from "@/components/shared";
import { ProductCard } from "@/components/shared/product-card";
import { ProductsGroupList } from "@/components/shared/product-group-list";
import { TopBar } from "@/components/shared/top-bar";
import { Button } from "@/components/ui/button";
import { ImageUp } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const newLocal = "flex flex-col gap-16";

  return (
    <>
      <Container className="mt-8">
        <Title text="Вся продукция" size="lg" className="font-extrabold"/>
      </Container>

      <TopBar/>

      <Container className="mt-8 pb-14">
        <div className="flex gap-[80px]">

          {/* Фильтрация */}
          <div className="w-[250px]">
            <Filters/>
          </div>



          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList title="Гигиена" items={[
                {
                  id: 1,
                  name: "BENOVY LATEX CHLORINATED",
                  imageUrl: "http://artmedural.ru/image/cache/catalog/tovar/t02/t21/t311/fffc20728b52ed9761d3903053422c17-1100x1100.png",
                  price: 550,
                  items: [{price: 550}],
                },
                {
                  id: 1,
                  name: "BENOVY LATEX CHLORINATED",
                  imageUrl: "http://artmedural.ru/image/cache/catalog/tovar/t02/t21/t311/fffc20728b52ed9761d3903053422c17-1100x1100.png",
                  price: 550,
                  items: [{price: 550}],
                },
                ]} 
                  categoryId={1} />

                <ProductsGroupList title="Контроль продуктов питания" items={[
                {
                  id: 1,
                  name: "Молконт-рН",
                  imageUrl: "http://artmedural.ru/image/cache/catalog/tovar/t08/312----800x1000-1100x1100h.jpg",
                  price: 350,
                  items: [{price: 350}],
                },
                {
                  id: 1,
                  name: "Молконт-рН",
                  imageUrl: "http://artmedural.ru/image/cache/catalog/tovar/t08/312----800x1000-1100x1100h.jpg",
                  price: 350,
                  items: [{price: 350}],
                },
                

                
                ]} 
                  categoryId={1} />
            </div>
          </div>
        </div>
      </Container>
     </>
  )

}
