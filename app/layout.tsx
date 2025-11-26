import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nathan Arruda - Tech Lead & Software Architect",
  description: "Tech Lead transformando ideias em código de alta performance há mais de 10 anos. Especialista em .NET Core, Azure Cloud e arquitetura de microsserviços.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
