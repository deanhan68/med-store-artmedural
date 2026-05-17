import { Nunito } from "next/font/google";

import "./globals.css"
import { Providers } from "@/shared/components/shared/providers";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["cyrillic"],
  weight: ['400', '500', '600', '700', '800', '900']
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
            <link data-rh="true" rel="icon" href="/logo.png" />
        </head>
        {/* Добавили max-w-[100vw] и overflow-x-hidden прямо к шрифту */}
        <body className={`${nunito.className} max-w-[100vw] overflow-x-hidden antialiased`}>
          <Providers>{children}</Providers>
        </body>
    </html>
  );
}