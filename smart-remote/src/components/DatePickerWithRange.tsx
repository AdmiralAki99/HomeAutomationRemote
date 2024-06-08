"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "../@/lib/utils"
import { Button } from "../@/components/ui/button"
import { Calendar } from "../@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../@/components/ui/popover"

interface DatePickerWithRangeProps{
  className:string,
  from:string,
  to:string

}

// export default function DatePickerWithRange({ className,from,to }: { className?: string ,from?:string,to?:string}){

//   const [date, setDate] = (from && to) ? React.useState<DateRange>({
//     from: new Date(from),
//     to: new Date(to),
//   }):React.useState<DateRange | undefined>({
//     from: new Date(),
//     to: addDays(new Date(), 20),
//   })

//   return (
//     <div className={cn("grid gap-2 z-50", className)}>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             id="date"
//             variant={"outline"}
//             className={cn(
//               "w-[300px] justify-start text-left font-normal",
//               !date && "text-muted-foreground"
//             )}
//           >
//             <CalendarIcon className="mr-2 h-4 w-4" />
//             {date?.from ? (
//               date.to ? (
//                 <>
//                   {format(date.from, "LLL dd, y")} -{" "}
//                   {format(date.to, "LLL dd, y")}
//                 </>
//               ) : (
//                 format(date.from, "LLL dd, y")
//               )
//             ) : (
//               <span>Pick a date</span>
//             )}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0" align="start">
//           <Calendar
//             initialFocus
//             mode="range"
//             defaultMonth={date?.from}
//             selected={date}
//             onSelect={setDate}
//             numberOfMonths={2}
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   )
// }

class DatePickerWithRange extends React.Component<DatePickerWithRangeProps> {

  state = {
    from: '',
    to: '',
    date: {
      from: new Date(),
      to: addDays(new Date(), 20),
    }
  }

  constructor(props: DatePickerWithRangeProps) {
    super(props);
    this.state = {
      from: (props.from) ? props.from : '',
      to: (props.to) ? props.to : '',
      date: (props.from != "")? {
        from: addDays(new Date(props.from),1),
        to: addDays(new Date(props.to),1),
      }: {
        from: new Date(),
        to: addDays(new Date(), 20),
      }
    }
  }

  setDate = (date: DateRange|undefined) => {
    if (date) {
      this.setState({ date })
    }
  }

  render() {
    return (
      <div className={cn("grid gap-2 z-50", this.props.className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !this.state.date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {this.state.date?.from ? (
                this.state.date.to ? (
                  <>
                    {format(this.state.date.from, "LLL dd, y")} -{" "}
                    {format(this.state.date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(this.state.date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={this.state.date.from}
              selected={this.state.date}
              onSelect={(date) => this.setDate(date)}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    )
  }
}

export default DatePickerWithRange
