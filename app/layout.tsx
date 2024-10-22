import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/assets/globals.css";
import Header from "./head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Бесплатное создание музыки в браузере",
  description: "Создавайте музыку бесплатно с искуственным интеллектом у вас в браузере!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="ru">
      <Header />
      <body className={inter.className}>
      {children}
      </body>
      </html>
  );
}
