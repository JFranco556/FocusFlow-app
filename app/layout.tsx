import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "FocusFlow",
  description: "Asistente Académico Inteligente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-body-md bg-background text-on-surface min-h-screen pb-[80px]`}>
        <Providers>
          {/* TopAppBar */}
          <header className="sticky top-0 w-full z-50 backdrop-blur-md shadow-[0px_4px_12px_rgba(15,23,42,0.04)] bg-surface/80">
            <div className="flex items-center justify-between px-margin-mobile h-14 w-full max-w-[768px] mx-auto">
              <div className="flex items-center gap-sm">
                <div className="w-8 h-8 rounded-full bg-surface-variant overflow-hidden flex items-center justify-center">
                  <img
                    alt="User Profile"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7MWmU6S4DS8dqyDSpaahs3qDwuB7uwMXGGtQtKqxC7pcdF901cuTq62eMnYrHaECG_We8J07f2fnSYIBCEk6QqOfy0KMtEHsrnlXZyYKWxESyJ54OS9vgSbwC8Qr93vGyFvfC9uNgfgY4vhKPxswY7bZZZURnccWb3oSnEP6MZ27sbeNP-T7BBxrO4-4x5dO1uswMvZhTKTLMLi_avLOMOodfdqlD2MEkaoWvpzVnFc9V0sQnk5FGRkOoyow0kyW83F04LCy3_iDz"
                  />
                </div>
                <h1 className="font-headline-md-mobile text-headline-md-mobile font-bold text-on-surface">FocusFlow</h1>
              </div>
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-variant text-on-surface-variant hover:opacity-80 transition-opacity active:scale-95 transition-transform">
                <span className="material-symbols-outlined">notifications</span>
              </button>
            </div>
          </header>

          {children}

          {/* BottomNavBar */}
          <nav className="fixed bottom-0 w-full h-[56px] z-50 bg-surface shadow-[0px_-2px_8px_rgba(0,0,0,0.05)]">
            <div className="flex justify-around items-center w-full max-w-[768px] mx-auto px-margin-mobile h-full">
              <Link href="/" className="flex flex-col items-center justify-center text-secondary relative hover:opacity-80 transition-opacity active:scale-90 transition-transform">
                <span className="material-symbols-outlined" data-weight="fill">dashboard</span>
                <span className="font-label-sm text-label-sm mt-1">Dashboard</span>
              </Link>
              <Link href="/tasks" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 transition-transform">
                <span className="material-symbols-outlined">checklist</span>
                <span className="font-label-sm text-label-sm mt-1">Tareas</span>
              </Link>
              <Link href="/schedule" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 transition-transform">
                <span className="material-symbols-outlined">calendar_month</span>
                <span className="font-label-sm text-label-sm mt-1">Horario</span>
              </Link>
              <Link href="/chat" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors active:scale-90 transition-transform">
                <span className="material-symbols-outlined">smart_toy</span>
                <span className="font-label-sm text-label-sm mt-1">Chat</span>
              </Link>
            </div>
          </nav>
        </Providers>
      </body>
    </html>
  );
}
