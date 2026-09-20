import type { Metadata } from "next";
import localFont from "next/font/local";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "LaseCraft | Natural Ideas Last Longer",
    template: "%s | LaseCraft",
  },
  description:
    "Personalised laser-cut and engraved products in wood, acrylic and leather. Your Design. Our Precision. Ideas. Made Personal. Based in Gloucestershire, UK.",
  keywords: [
    "laser cut",
    "laser engrave",
    "personalised gifts",
    "wood acrylic leather",
    "Gloucestershire",
    "LaseCraft",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body
        className={`${geistSans.variable} flex min-h-screen flex-col bg-cream font-sans text-charcoal antialiased`}
      >
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
