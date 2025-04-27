"use client"

import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({
   subsets: ["latin"],
   display: "swap",
});


export default function DevLayout({ children }: Readonly<{ children: React.ReactNode }>) { 
   return (
      <div
         className={cn(
            "w-screen h-screen overflow-hidden flex",
            inter.className,
         )}
         style={{}}
      >
         <main className="h-full w-full">
            {children}
         </main>
      </div>
   )
}
