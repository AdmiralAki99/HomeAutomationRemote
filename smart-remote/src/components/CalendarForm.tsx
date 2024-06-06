import React from "react";


import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { LocalizationProvider, TimeClock } from "@mui/x-date-pickers";
import DatePickerWithRange from "./DatePickerWithRange";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme,ThemeProvider } from "@mui/material/styles";
import dayjs from "dayjs";

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
        background: {
            default: "#1c1c1c",
        },
        text: {
            primary: "#ffffff",
        },
        primary: {
            main: "#DA3B5E",
        },
    }

})

class CalendarForm extends React.Component<CalendarFormProps>{
    state = {
        modalOpen: false,
    }

    constructor(props: CalendarFormProps){
        super(props);
        this.state = {
            modalOpen: props.modalOpen,
        }
    }


    render(){
        return (
          <Box sx={formStyle}>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="grid grid-cols-2">
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Event
                </Typography>
                <IconButton edge="end" aria-label="Edit">
                  <DoneIcon />
                </IconButton>
              </div>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Title
              </Typography>
              <TextField id="outlined-basic" variant="outlined" />
              <Button variant="contained">Scan</Button>
              <div>
                <FormGroup>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="All Day"
                  />
                </FormGroup>
                <div className="grid grid-cols-3 pl-2">
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Start Date
                  </Typography>
                  <DatePicker />
                  <TimePicker />
                </div>
                <div className="grid grid-cols-3 pl-2">
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    End Date
                  </Typography>
                  <DatePicker />
                  <TimePicker />
                </div>
                <div className="grid grid-cols-2 pl-2">
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Completed
                  </Typography>
                  <Checkbox sx={{}} />
                </div>
                <div>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Description
                  </Typography>
                  <TextField
                    id="standard-multiline-static"
                    multiline
                    rows={4}
                    defaultValue="Description"
                    variant="standard"
                  />
                </div>
                <div>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Colour
                  </Typography>
                </div>
              </div>
            </LocalizationProvider> */}
            <div className="text-white">
              <div className="flex bg-bubblegum items-center justify-between h-10 pr-2 pl-2">
                <h1>Event</h1>
                <button onClick={this.props.handleCloseModal}>Close</button>
              </div>
              <div className="pl-4 pt-2">
                <h2 className="pb-2">Title</h2>
                <input
                  type="text"
                  className="bg-transparent border-2 border-white w-3/4 h-10"
                />
                <form className=" z-50">
                  <h2 className="pb-2 pt-2">Date</h2>
                  <DatePickerWithRange />
                  <h2 className="pb-2 pt-2">Time</h2>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <ThemeProvider theme={timeClockStyle}>
                      <div className="flex justify-end items-center">
                        <div className="w-1/2 flex flex-row">
                          <h2 className="pb-2 pt-2">From</h2>
                          <TimeClock defaultValue={dayjs(new Date())} onChange={(date) => console.log(date)} />
                        </div>
                        <div className="w-1/2 flex flex-row">
                          <h2 className="pb-2 pt-2">To</h2>
                          <TimeClock defaultValue={dayjs(new Date())} onChange={(date) => console.log(date)} />
                        </div>
                      </div>
                    </ThemeProvider>
                  </LocalizationProvider>
                </form>
              </div>
            </div>
          </Box>
        );
    }
}

export default CalendarForm