import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import { Starfield } from "@/components/Starfield";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin", "latin-ext"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Ruh Eşini Gökyüzü Söylesin",
  description: "10 soruluk mistik kişilik testi. Yıldızlar ruh eşini fısıldıyor.",
};

export const viewport: Viewport = {
  themeColor: "#07051a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${cinzel.variable} ${cormorant.variable} antialiased`}>
      <body>
        <Starfield />
        {children}
      </body>
    </html>
  );
}
