import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rubén Gutiérrez — Full-stack Engineer",
  description:
    "Portfolio de Rubén Gutiérrez. Full-stack engineer enfocado en plataformas web y móvil, arquitectura clara y seguridad. Valledupar, Colombia.",
  keywords: [
    "Rubén Gutiérrez",
    "Full-stack",
    "NestJS",
    "Next.js",
    "Flutter",
    "Colombia",
    "Valledupar",
    "Portfolio",
  ],
  authors: [{ name: "Rubén Gutiérrez", url: "https://github.com/ErisGC" }],
  openGraph: {
    title: "Rubén Gutiérrez — Full-stack Engineer",
    description:
      "Portfolio de Rubén Gutiérrez. Plataformas web + móvil con foco en arquitectura clara y seguridad.",
    type: "website",
    locale: "es_CO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <body className="scanline min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
