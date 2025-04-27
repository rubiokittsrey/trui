"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export interface PickerWheelProps<T = number | string> {
   items: T[];
   value: T;
   onSelect: React.Dispatch<React.SetStateAction<T>>;
}

function PickerWheel<T extends number | string>({ items, value, onSelect }: PickerWheelProps<T>) {
   const scrollRef = useRef<HTMLDivElement | null>(null);
   const ITEM_HEIGHT = 40;
   
   useEffect(() => {
      const scrollElement = scrollRef.current;
      if (!scrollElement) return;
      
      scrollElement.scrollTop = items.length * ITEM_HEIGHT;
   }, [items]);
   
   return (
      <div
         ref={scrollRef}
         className={cn(
            "relative overflow-y-scroll snap-y snap-mandatory",
            "h-12 px-2 border-y-1",
         )}
         style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
         }}
      >
         <div className="flex flex-col items-center">
            {[...items, ...items, ...items].map((item, index) => (
               <button
                  key={`${item}${index}`}
                  className={cn(
                     "h-10 aspect-square flex items-center justify-center snap-center",
                     "hover:bg-neutral-600/25 cursor-pointer rounded-md",
                     value === item ? 'text-blue-500 font-bold' : 'text-gray-700'
                  )}
                  onClick={() => {onSelect(item)}}
               >
                  {item}
               </button>
            ))}
         </div>
      </div>
   )
}

export {
   PickerWheel
}
