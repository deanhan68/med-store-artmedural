import { Categories, CheckboxFiltersGroup, Container, Filters, SortPopup, Title } from "@/components/shared";
import { TopBar } from "@/components/shared/top-bar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Container className="mt-8">
        <Title text="Вся продукция" size="lg" className="font-extrabold"/>
      </Container>

      <TopBar/>

      <Container className="mt-8 pb-14">
        <div className="flex gap-[60px]">

          {/* Фильтрация */}
          <div className="x-[250px]">
            <Filters/>
          </div>



          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              Список товаров
            </div>
          </div>



        </div>
       
        
      </Container>
     

     

      
     </>
  )

}
