import type { Metadata } from "next";
import "./globals.css";
import "./portfolio.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Cursor from "@/components/interactive/Cursor";

export const metadata: Metadata = {
  title: "Wilhelmina Lorenzia Wijaya - Portfolio",
  description: "Full Stack Developer Portfolio - Crafting digital experiences that push boundaries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Cursor />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
