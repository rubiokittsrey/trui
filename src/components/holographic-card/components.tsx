import React, {
   useState,
   useEffect,
   useRef,
   useMemo,
   CSSProperties,
} from "react";

function Stage({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
   return (
      <div {...props} className="stage">
         {children}
      </div>
   );
}

function Card({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
   const cardRef = useRef<HTMLDivElement | null>(null);
   const [pointer, setPointer] = useState<{ x: number; y: number }>({
      x: 240,
      y: 160,
   });

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

   useEffect(() => {
      function updatePointer(e: PointerEvent) {
         setPointer({ x: e.clientX, y: e.clientY });
      }
      document.addEventListener("pointermove", updatePointer, true);
      return () => {
         document.removeEventListener("pointermove", updatePointer);
      };
   }, []);

   return (
      <div {...props} className="card" ref={cardRef} style={cardStyles}>
         {children}
      </div>
   );
}

function Foil({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
   return <div {...props} className="foil" />;
}

function Glare({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
   return <div {...props} className="glare" />;
}

export { Stage, Card, Foil, Glare };
