"use client";

import React from "react";
import "./styles.css";
import { cn } from "@/lib/utils";
import { Card, Foil, Glare } from "./components";

export function HoloCard2({children, className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
   return (
      <div className="perspective-[800px] transform-3d">
         <Card className="h-96 w-72">
            <div
               {...props}
               className={cn(
                  "absolute top-0 right-0 left-0 bottom-0 flex flex-col p-5 z-10",
                  className
               )}
            >
               {children}
            </div>
            <Foil/>
            <Glare/>
         </Card>
      </div>
   )
}