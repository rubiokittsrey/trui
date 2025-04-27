import { cn } from "@/lib/utils";
import React from "react";

function TitleH1({className, children, ...props} : React.ComponentProps<"h1">) {
   return (
      <h1
         {...props}
         className={cn(
            "text-4xl font-semibold",
            className
         )}
      >
         {children}
      </h1>
   )
}

export {
   TitleH1
}
