import type { Metadata } from "next";
import { geistMono, geistSans } from "../config/fonts";
import "./globals.css";



export const metadata: Metadata = {
  title: "Teslo Shop",
  description: "Una tienda virtual de productos",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
