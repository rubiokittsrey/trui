"use client"

import { cn } from "@/lib/utils";
import { ArrowUpRight, Globe, Mail } from "lucide-react";
import "./styles.css";
import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";

export default function Holographic3dCard() {
   const [pointer, setPointer] = useState<{x: number, y: number}>({x:240, y:160});
   const [hovered, setHovered] = useState(false);
   const cardRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      function updatePointer(e: PointerEvent) {
         setPointer({ x: e.clientX, y:e.clientY });
      }
      document.addEventListener("pointermove", updatePointer, true);
      return () => {
         document.removeEventListener("pointermove", updatePointer);
      }
   }, []);

   const cardStyles = useMemo<CSSProperties>(() => {
      if (!cardRef.current) return {};
      const rect = cardRef.current.getBoundingClientRect();

      const rX = pointer.x - rect.left;
      const rY = pointer.y - rect.top;
      const pX = rX / rect.width;
      const pY = rY / rect.height;

      const cX = (pX - 0.5) * 2;
      const cY = (pY - 0.5) * 2;

      const spX = Math.min(Math.max(pX, 0), 1);
      const spY = Math.min(Math.max(pY, 0), 1);

      return {
         "--x": `${pX * 100}%`,
         "--y": `${pY * 100}%`,
         "--sx": `${spX * 100}%`,
         "--sy": `${spY * 100}%`,
         "--posx": hovered ? `${spX * 25}%` : "12%",
         "--posy": hovered ? `${spY * 25}%` : "12%",
         "--ry": hovered ? `${cX * -6}deg` : "0deg",
         "--rx": hovered ? `${-cY * -6}deg` : "0deg",
      } as CSSProperties;
   }, [pointer]);

   const links:  {href: string, child: string, icon: React.ReactElement}[] = [
      {
         href: "mailto:kittsreyrubio@gmail.com",
         child: "kittsreyrubio@gmail.com",
         icon: <Mail className="stroke-[1.5] size-4.5"/>
      },
      {
         href: "https://mfn.topher.dev",
         child: "mfn.topher.dev",
         icon: <Globe className="stroke-[1.5] size-4.5"/>
      },
   ]

   return (
      <div
         onMouseOver={() => setHovered(true)}
         onMouseOut={() => setHovered(false)}
         className="perspective-[600px] transform-3d"
      >
         <div
            ref={cardRef}
            style={{...cardStyles}}
            className={cn(
               "w-[50em] h-[27em] p-2 relative overflow-clip",
               "card rounded-xl transition-all duration-300 ease-out bg-neutral-800"
            )}
         >
            <div className="relative overflow-clip rounded-xl h-full">
               <div
                  className={cn(
                     "flex flex-col justify-between py-12 content-bg overflow-clip",
                     "h-full rounded-xl absolute inset-0"
                  )}
               >
                  <div
                     className="flex flex-1/6 px-14 justify-between font-mono"
                  >
                     <h4
                        className="text-4xl select-none font-medium z-30"
                     >
                        MFN.TOPHER.DEV
                     </h4>
                     <Globe className="stroke-[1.5] size-9 text-orange-800 z-10"/>
                  </div>
                  <div className="flex-4/6 font-mono flex space-x-2">
                  </div>
                  <div 
                     className="space-y-2 flex-1/6 row-span-2 flex flex-col justify-end font-mono px-14 z-30"
                  >
                     {links.map((l, index) => (
                        <div key={`${index}${l.href}`} className="flex space-x-4 items-center">
                           {l.icon}
                           <a
                              className="underline decoration-transparent hover:decoration-current transition-colors select-none"
                              href={l.href}
                           >
                              {l.child}
                           </a>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="absolute inset-0 bg-stone-950 brightness-60 z-0 backdrop-blur-2xl"/>
            </div>
            <div className="z-20 pointer-events-none is_overlay card__shine mix-blend-color-dodge transition-all duration-300 ease-out opacity-95"/>
         </div>
      </div>
   )
}