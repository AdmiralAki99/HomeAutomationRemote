import React from "react"

import Box from '@mui/material/Box';
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import DatePickerWithRange from "./DatePickerWithRange";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme,ThemeProvider } from "@mui/material/styles";
import dayjs from "dayjs";

import { KeyboardComponent } from './KeyboardComponent';
import {motion} from "framer-motion";
import CloseIcon  from "@mui/icons-material/Close";
import DoneIcon  from "@mui/icons-material/Done";



interface CalendarFormProps{
    modalOpen: boolean;
    handleCloseModal: () => void;
}

const formStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    transform: "translate(-89.5%,20%)",
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

class CalendarForm extends React.Component<CalendarFormProps> {
  state = {
    modalOpen: false,
    inputFocused: false,
    eventInput: ''
  };

  constructor(props: CalendarFormProps) {
    super(props);
    this.state = {
      modalOpen: props.modalOpen,
      inputFocused: false,
      eventInput: ''
    };
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
    console.log(date);
  }

 
  render() {
    return (
      <Box sx={formStyle}>
        <div className="text-white">
          <div className="flex bg-bubblegum items-center justify-between h-10 pr-2 pl-2">
            <h1>Event</h1>
            <div className="flex flex-row justify-between">
              <button className="pr-2"><DoneIcon sx={{color:"white"}}/></button>
              <button onClick={this.props.handleCloseModal}><CloseIcon sx={{color:"white"}}/></button>
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
              <DatePickerWithRange className={""} from={""} to={""} onSetDate={this.onSetDate} />
              <h2 className="pb-2 pt-2">Time</h2>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={timeClockStyle}>
                  <div className="flex justify-end items-center">
                    <div className="w-1/2 flex flex-row">
                      <h2 className="pb-2 pt-2">From</h2>
                      <MobileTimePicker
                        sx={{ bgcolor: "#1c1c1c" }}
                        format="hh:mm"
                      />
                    </div>
                    <div className="w-1/2 flex flex-row">
                      <h2 className="pb-2 pt-2">To</h2>
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

export default CalendarForm