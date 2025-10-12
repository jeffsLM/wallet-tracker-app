import type { Metadata } from "next";
import { Kodchasan } from "next/font/google";
import "./globals.css";
import { Providers } from '@/providers';
import Header from '@/components/Header';

const kodchasan = Kodchasan({
  variable: "--font-kodchasan-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wallet Tracker",
  description: "A simple app to track your family finances",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${kodchasan.variable} antialiased font-sans mb-8`}
      >
        <Header />
        <div className="max-w-screen-xl mx-auto">
          <Providers>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
