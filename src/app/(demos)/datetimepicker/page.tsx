import { DateTimePicker } from "@/components/datetimepicker";
import { TitleH1 } from "@/components/utils";

export default function DateTimePickerDemo() {
   return (
      <div className="w-full h-full flex flex-col justify-center items-center space-y-16">
         <TitleH1>date-time-picker</TitleH1>
         <DateTimePicker/>
      </div>
   )
}
