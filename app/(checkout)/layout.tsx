import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../globals.css"
import { Container, Header } from "@/shared/components/shared";


const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["cyrillic"],
  weight:['400', '500', '600','700','800', '900']
});



export const metadata: Metadata = {
  title: "ArtMedUral | Корзина",

};

export default function CheckoutLayout({ children, }: Readonly<{ children: React.ReactNode;}>) {
  return (
    <main className="min-h-screen bg-[#EEF1F4]">
        {/* Убираем border-b отсюда */}
        <Header hasSearch={false} hasCart={false} className="bg-[#EEF1F4]"/>
        <Container>
            {children}
        </Container>
    </main>
  );
}