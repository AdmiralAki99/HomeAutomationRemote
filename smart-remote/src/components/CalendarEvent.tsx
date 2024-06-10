import React from "react"

import Box from '@mui/material/Box';
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import DatePickerWithRange from "./DatePickerWithRange";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme,ThemeProvider } from "@mui/material/styles";

import { KeyboardComponent } from './KeyboardComponent';
import axios from "axios";
import {motion} from "framer-motion";

import CloseIcon from "@mui/icons-material/Close";
import SaveIcon  from "@mui/icons-material/Save";
import DoneIcon  from "@mui/icons-material/Done";
import { id } from "date-fns/locale";




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
    startHour: '',
    startMinute: '',
    endHour: '',
    endMinute: '',
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
      startHour: props.event.start_hour === undefined ? "" : props.event.start_hour,
      startMinute: props.event.start_minute === undefined ? "" : props.event.start_minute,
      endHour: props.event.end_hour === undefined ? "" : props.event.end_hour,
      endMinute: props.event.end_minute === undefined ? "" : props.event.end_minute,
      completed: props.event.status === undefined ? false : props.event.status,
    };
    this.formatString = this.formatString.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onHide = this.onHide.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSetDate = this.onSetDate.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.completeEvent = this.completeEvent.bind(this);
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

  onSetDate = (date: any) => {
    if(date.from !== undefined ||  date.to !== undefined || date == undefined){
      this.setState({startDate: date.from, endDate: date.to})
    }
  }

  updateEvent = () =>{
    axios.post('/calendar/update',{
      id: this.props.event.id,
      title: this.state.eventInput,
      allDay: this.state.allDay,
      colour: this.state.colour,
      calendar: this.state.calendar,
      description: this.state.description,
      start_date_day: new Date(this.state.startDate).getDate(),
      start_date_month: new Date(this.state.startDate).getMonth(),
      start_date_year: new Date(this.state.startDate).getFullYear(),
      end_date_day: new Date(this.state.endDate).getDate(),
      end_date_month: new Date(this.state.endDate).getMonth(),
      end_date_year: new Date(this.state.endDate).getFullYear(),
      start_time_hour: this.state.startHour,
      start_time_minute: this.state.startMinute,
      end_time_hour: this.state.endHour,
      end_time_minute: this.state.endMinute,
      status: this.state.completed
    }).then(response => {

    })
  }

  completeEvent = () =>{
    this.setState({completed: true})
    axios.post('/calendar/complete',{
      id: this.props.event.id
    })
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
              <button className="pr-2" onClick={this.completeEvent}>
                <DoneIcon sx={{ color: "white" }} />
              </button>
              <button className="pr-2" onClick={this.updateEvent}>
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
                onSetDate={this.onSetDate}
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
                        onAccept={(time: any) => {
                          this.setState({startHour: time.$H,startMinute: time.$m})
                        }}
                      />
                    </div>
                    <div className="w-1/2 flex flex-row">
                      <h2 className="pb-2 pt-2 pr-2">To</h2>
                      <MobileTimePicker
                        sx={{ bgcolor: "#1c1c1c" }}
                        format="hh:mm"
                        onAccept={(time: any) => {
                          this.setState({endHour: time.$H,endMinute: time.$m})
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