import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import { ClerkProvider } from '@clerk/nextjs';

import LeftSideBar from "@/components/layout/LeftSideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IceSkating - Панель администратора",
  description: "Панель администратора для управления данными",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex max-lg:flex-col text-grey-1">
            <LeftSideBar />
            <div className="flex-1">{children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
