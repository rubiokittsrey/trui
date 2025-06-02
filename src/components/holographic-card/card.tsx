"use client";

import "./styles.css";
import { Card, Foil, Glare, Stage } from "./components";

export default function HolographicCard() {
   return (
      <Stage>
         <Card>
            <div className="content">
               <h1>Demo</h1>
               <p>1234</p>
            </div>
            <Foil />
            <Glare />
         </Card>
      </Stage>
   );
}
