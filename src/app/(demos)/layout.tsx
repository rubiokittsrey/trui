import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
   variable: "--font-inter",
   subsets: ["latin"],
});

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body className={`${inter.variable} antialiased`}>
            <div className="h-screen w-screen overflow-hidden dark:bg-neutral-900">
               {children}
            </div>
         </body>
      </html>
   );
}