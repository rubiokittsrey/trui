import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../globals.css";

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div className="h-screen w-screen overflow-hidden dark:bg-neutral-900">
         {children}
      </div>
   );
}