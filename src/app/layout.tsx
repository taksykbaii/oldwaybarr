import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oldway Barbershop | Премиум барбершоп в Астане",
  description: "Лучший барбершоп в Астане. Стрижки, борода, премиум сервис.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className="bg-brand-bg text-brand-text font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}
