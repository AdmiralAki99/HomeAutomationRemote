import React from "react"

import Box from '@mui/material/Box';
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import DatePickerWithRange from "./DatePickerWithRange";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme,ThemeProvider } from "@mui/material/styles";

import { KeyboardComponent } from './KeyboardComponent';
import {motion} from "framer-motion";

import CloseIcon  from "@mui/icons-material/Close";
import SaveIcon  from "@mui/icons-material/Save";




interface CalendarEventProps{
    modalOpen: boolean;
    event: any;
    handleCloseModal: () => void;
}

const formStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    transform: "translate(0%,20%)",
    width: 605,
    height: 600,
    bgcolor: "#1c1c1c",
    boxShadow: 24,
};

const timeClockStyle = createTheme({

    palette:{
        mode: "dark",
        background: {
            paper: "#1c1c1c",
        },
        text: {
            primary: "#ffffff",
            secondary: "#ffffff"
        },
        primary: {
            main: "#DA3B5E",
        },

    }

})

class CalendarEvent extends React.Component<CalendarEventProps> {
  state = {
    modalOpen: false,
    inputFocused: false,
    eventInput: '',
    allDay: false,
    colour: '',
    calendar: '',
    description: '' ,
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    completed: false,
  };

  constructor(props: CalendarEventProps) {
    super(props);
    this.state = {
      modalOpen: props.modalOpen,
      inputFocused: false,
      eventInput: props.event.title === undefined ? "" : props.event.title,
      allDay: props.event.allDay === undefined ? false : props.event.allDay,
      colour: props.event.colour === undefined ? "" : props.event.colour,
      calendar: props.event.calendar === undefined ? "" : props.event.calendar,
      description:
        props.event.description === undefined ? "" : props.event.description,
      startDate:
        props.event.start_date_day === undefined ||
        props.event.start_date_month == undefined ||
        this.props.event.start_date_year == undefined
          ? ""
          : this.formatString(
              props.event.start_date_day,
              props.event.start_date_month,
              props.event.start_date_year
            ),
      endDate:
        props.event.end_date_day === undefined ||
        props.event.end_date_month == undefined ||
        props.event.end_date_year == undefined
          ? ""
          : this.formatString(
              props.event.end_date_day,
              props.event.end_date_month,
              props.event.end_date_year
            ),
      startTime:
        props.event.start_time_hour === undefined ||
        props.event.start_time_minute == undefined
          ? ""
          : `${props.event.start_time_hour}:${props.event.start_time_minute}`,
      endTime:
        props.event.end_time_hour === undefined ||
        props.event.end_time_minute == undefined
          ? ""
          : `${props.event.end_time_hour}:${props.event.end_time_minute}`,
      completed: props.event.status === undefined ? false : props.event.status,
    };
    this.formatString = this.formatString.bind(this);
  }

  onChange = (input: any) => {
    this.setState({ eventInput: input });
  };

  onHide = () =>{
    this.setState({inputFocused: false})
  }

  onSubmit = ()=>{
    console.log(this.state.eventInput)
    this.onHide()
  }

  formatString = (day:number, month:number, year:number) => {
    switch (month) {
        case 1:
            return `${day} January ${year} 00:00:00 GMT`;
        case 2:
            return `${day} February ${year} 00:00:00 GMT`;
        case 3:
            return `${day} March ${year} 00:00:00 GMT`;
        case 4:
            return `${day} April ${year} 00:00:00 GMT`;
        case 5:
            return `${day} May ${year} 00:00:00 GMT`;
        case 6:
            return `${day} June ${year} 00:00:00 GMT`;
        case 7:
            return `${day} July ${year} 00:00:00 GMT`;
        case 8:
            return `${day} August ${year} 00:00:00 GMT`;
        case 9:
            return `${day} September ${year} 00:00:00 GMT`;
        case 10:
            return `${day} October ${year} 00:00:00 GMT`;
        case 11:
            return `${day} November ${year} 00:00:00 GMT`;
        case 12:
            return `${day} December ${year} 00:00:00 GMT`;
        default:
            return "";
    }
  }

  render() {
    return (
      <Box sx={formStyle}>
        <div className="text-white">
          <div className="flex bg-bubblegum items-center justify-between h-10 pr-2 pl-2">
            <h1>Event</h1>
            <div className="flex flex-row justify-between">
              <button className="pr-2">
                <SaveIcon sx={{ color: "white" }} />
              </button>
              <button onClick={this.props.handleCloseModal}>
                <CloseIcon sx={{ color: "white" }} />
              </button>
            </div>
          </div>
          <div className="pl-4 pt-2">
            <h2 className="pb-2">Title</h2>
            <input
              type="text"
              className="bg-transparent border-2 border-white w-3/4 h-10 text-white"
              value={this.state.eventInput}
              onFocus={() => {
                this.setState({ inputFocused: true });
              }}
            />
            <div
              className={`${
                this.state.inputFocused === false
                  ? "hidden"
                  : "text-black absolute z-50 w-3/4"
              }`}
            >
              <motion.div drag>
                <KeyboardComponent
                  onChange={this.onChange}
                  isToggled={this.state.inputFocused}
                  onHide={this.onHide}
                  onSubmit={this.onSubmit}
                />
              </motion.div>
            </div>
            <form className=" z-50">
              <h2 className="pb-2 pt-2">Date</h2>
              <DatePickerWithRange
                className={""}
                from={this.state.startDate}
                to={this.state.endDate}
              />
              <h2 className="pb-2 pt-2">Time</h2>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={timeClockStyle}>
                  <div className="flex justify-end items-center">
                    <div className="w-1/2 flex flex-row">
                      <h2 className="pb-2 pt-2 pr-2">From</h2>
                      <MobileTimePicker
                        sx={{ bgcolor: "#1c1c1c" }}
                        format="hh:mm"
                      />
                    </div>
                    <div className="w-1/2 flex flex-row">
                      <h2 className="pb-2 pt-2 pr-2">To</h2>
                      <MobileTimePicker
                        sx={{ bgcolor: "#1c1c1c" }}
                        format="hh:mm"
                        onAccept={(time: any) => {
                          console.log(time.$H);
                        }}
                      />
                    </div>
                  </div>
                </ThemeProvider>
              </LocalizationProvider>
              <div></div>
            </form>
          </div>
        </div>
      </Box>
    );
  }
}

export default CalendarEvent