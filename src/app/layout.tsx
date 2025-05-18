import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header, Footer } from "@/components/ui";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "James Geiger - Portfolio",
  description: "Portfolio website showcasing projects, blog posts, and skills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col antialiased`}>
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
