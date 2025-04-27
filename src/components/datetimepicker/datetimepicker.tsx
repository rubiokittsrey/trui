"use client";

import React, { useState } from "react";
import {PickerWheel} from "./pickerwheel";

export interface DateTimerPickerProps extends React.ComponentProps<"div"> {
   value?: Date;
};

function DateTimePicker({...props} : DateTimerPickerProps) {
   const [selectedDay, setSelectedDay] = useState(1);
   const days = Array.from({ length: 31 }, (_, i) => i + 1);
   
   return (
      <div {...props}>
         <p className="text-2xl text-center mb-5">{selectedDay}</p>
         <PickerWheel items={days} value={selectedDay} onSelect={setSelectedDay}/>
      </div>
   )
}

export {
   DateTimePicker
}
