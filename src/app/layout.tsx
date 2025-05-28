import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar, Footer } from "@/components/ui";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { StagewiseToolbar } from '@stagewise/toolbar-next';
import { ThemeProvider } from '@/components/ThemeProvider';

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
  const stagewiseConfig = { plugins: [] };

  return (
    <html lang="en" className="h-full" style={{ scrollBehavior: 'auto' }}>
      <body className={`${inter.className} min-h-full flex flex-col antialiased bg-gradient-to-b from-primary-100 via-background-light to-secondary-100 dark:bg-background dark:bg-none relative overflow-x-hidden`}>
        <div className="min-h-screen bg-gradient-playful from-primary-100 via-background-light to-secondary-100 dark:from-primary-950 dark:via-background-dark dark:to-secondary-950 flex items-center justify-center">
          <span className="text-3xl text-white">TEST GRADIENT</span>
        </div>
        {/* Decorative gradient blobs */}
        <div aria-hidden="true" className="pointer-events-none select-none fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-primary-300 via-accent-200 to-secondary-200 opacity-30 blur-3xl dark:from-primary-900 dark:via-accent-900 dark:to-secondary-900 z-0 animate-float1" />
        <div aria-hidden="true" className="pointer-events-none select-none fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-tertiary-200 via-secondary-100 to-primary-100 opacity-30 blur-3xl dark:from-tertiary-900 dark:via-secondary-900 dark:to-primary-900 z-0 animate-float2" />
        {/* Main content */}
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <div className="flex-1 relative z-10 pt-16">
              {children}
            </div>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
        {/* StagewiseToolbar should be outside all providers */}
        {process.env.NODE_ENV === 'development' && (
          <StagewiseToolbar config={stagewiseConfig} />
        )}
      </body>
    </html>
  );
}
