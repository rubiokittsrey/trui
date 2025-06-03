import React, { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import "./styles.css";
import { cn } from "@/lib/utils";

export function Card({children, className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
   const [pointer, setPointer] = useState<{ x: number; y: number }>({ x: 240, y: 160 });
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

      const spX = Math.min(Math.max(pX, 0), 1);
      const spY = Math.min(Math.max(pY, 0), 1);
      
      const aX = pointer.x / window.innerWidth;
      const aY = pointer.y / window.innerHeight;

      return {
         "--x": `${pX * 100}%`,
         "--y": `${pY * 100}%`,
         "--sx": `${spX * 100}%`,
         "--sy": `${spY * 100}%`,
         "--rx": `${-40 * aY + 20}deg`,
         "--ry": `${40 * aX - 20}deg`,
      } as CSSProperties;
   }, [pointer]);

   return (
      <div
         {...props}
         className={cn(
            "relative w-[13em] h-[16em] rounded-[0.75em] bg-neutral-800 text-white overflow-hidden",
            "backface-hidden will-change-transform", className
         )}
         ref={cardRef}
         style={{...cardStyles, transform: "rotateX(var(--rx)) rotateY(var(--ry))"}}
      >
         {children}
      </div>
   );
}

export function Foil() {
   return (
      <div className="foil absolute top-0 right-0 left-0 bottom-0"/>
   )
}

export function Glare() {
   return (
      <div className="glare absolute top-0 right-0 left-0 bottom-0"/>
   )
}