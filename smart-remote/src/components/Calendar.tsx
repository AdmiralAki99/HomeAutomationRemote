import React from "react";
import format from "date-fns/format"
import addMonths from "date-fns/addMonths";
import isSameMonth from "date-fns/isSameMonth";
import subMonths from "date-fns/subMonths";
import addYears from "date-fns/addYears";
import subYears from "date-fns/subYears";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import endOfMonth from "date-fns/endOfMonth";
import addDays from "date-fns/addDays";

import './Calendar.css'
import { isSameDay, startOfMonth } from "date-fns";
import parse from "date-fns/parse";
import { rowsMetaStateInitializer } from "@mui/x-data-grid/internals";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import DatePicker from "./DatePicker";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface CalendarComponentState{
    currentMonth: Date,
    selectedDate: Date,
    monthEvents: {[key:string]:any[]},
    dayEvents: any[]
    open : boolean
}

const eventStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const isEmpty = (val: any) => val == null || !(Object.keys(val) || val).length;

class Calendar extends React.Component{

    getEventsForDate(date:Number,month:Number, year:Number){
      fetch(`/calendar/get/${date}-${month}-${year}`,{method:"GET"}).then(response => response.json()).then(
        data => {
          this.setState({
            dayEvents: data['appointments']
          })
        })
    }

    getEventsForMonth(month:Number, year:Number){
      fetch(`/calendar/get/month/${month}-${year}`,{method:"GET"}).then(response => response.json()).then(
        data => {
          this.setState({
            monthEvents: data
          })
        }
      )
    }

    state : CalendarComponentState = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      monthEvents: {},
      dayEvents: [],
      open: false
    }

    renderHeader(){
      const dateType = "MMMM yyyy";

      return (
        <div className="header row flex-middle">
          <div className="col col-start">
            <div className="icon" onClick={this.prevMonth}>
              chevron_left
            </div>
          </div>
          <div className="col col-center">
            <span>{format(this.state.currentMonth, dateType)}</span>
          </div>
          <div className="col col-end" onClick={this.nextMonth}>
            <div className="icon" onClick={this.prevMonth}>
              chevron_right
            </div>
          </div>
        </div>
      );
    }

    renderDays(){
      const dateType = "EEEE"
      const days = []

      let start = startOfWeek(this.state.currentMonth)

      for(let i=0; i<7; i++){
        days.push(
          <div className="col col-center" key={i}>
            {format(addDays(start, i), dateType)}
          </div>
        )
      }

      return(
        <div className="days row">
          {days}
        </div>
      )
    }

    renderCells(){
      const {currentMonth, selectedDate} = this.state
      const mStart = startOfMonth(currentMonth)
      const mEnd = endOfMonth(mStart)
      const startDate = startOfWeek(mStart)
      const endDate = endOfWeek(mEnd)

      const dateFormat = "d"
      const cells = []

      let days = []
      let currentDay = startDate
      let formattedDate = ""

      while(currentDay <= endDate){
        for(let i=0;i<7;i++){
          formattedDate = format(currentDay, dateFormat)
          const temp = currentDay
          days.push(
            <div className={`col cell ${!isSameMonth(temp,mStart)? "disabled":isSameDay(temp,selectedDate)? "selected":""}`} onClick={()=>{
              this.onDateClick(temp)}}>
              <span className="number">{formattedDate}</span>
              <span className="bg">{formattedDate}</span>
              {(`${temp.getDate()}-${temp.getMonth()+1}-${temp.getFullYear()}` in this.state.monthEvents)? this.state.monthEvents[`${temp.getDate()}-${temp.getMonth()+1}-${temp.getFullYear()}`].map((event:any)=>{
                return <span className="event" style={{backgroundColor:event.colour}}></span>
              }):""}
              {/* <span className="event bg-cyan-500"></span> */}
            </div>
          )
          currentDay = addDays(currentDay, 1)
        }
        cells.push(
          <div className="row">
              {days}
          </div>
        )
        days = []
      }

      return(
        <div className="body">
          {cells}
        </div>
      )
    }

    renderEventList(){
      return(
        <div>
          <Box>
            <List>
              {(isEmpty(this.state.dayEvents)) ? <ListItem><ListItemText primary="No events for this day"></ListItemText></ListItem>:this.state.dayEvents.map((event:any)=>{
                return (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar style={{backgroundColor:event.colour}}></Avatar>
                    </ListItemAvatar>
                    {/* <Button variant="text"><ListItemText primary={event.title}></ListItemText></Button> */}
                    <ListItemText primary={event.title} secondary={event.time}></ListItemText>
                    <IconButton edge="end" aria-label="Edit" onClick={()=>{this.setState({open:true})}}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="Edit">
                      <DoneIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                )
              })}
            </List>
          </Box>
        </div>
      )
    }

    renderEventModal(){
      return (
        <div>
          <Modal
            open={this.state.open}
            onClose={() => {
              this.setState({ open: false });
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={eventStyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Event
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Title
              </Typography>
              {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
              <div>
                <FormGroup>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="All Day"
                  />
                </FormGroup>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Description
                </Typography>
                {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Start Date
                </Typography>
                <DatePicker />
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  End Date
                </Typography>
                <DatePicker />
                <div>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Completed
                </Typography>
                <Checkbox {...label} />
                </div>
                <div>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Description
                </Typography>
                <TextField
                  id="standard-multiline-static"
                  label="Multiline"
                  multiline
                  rows={4}
                  defaultValue="Default Value"
                  variant="standard"
                />
                </div>
                <div>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Colour
                </Typography>
                </div>

              </div>
            </Box>
          </Modal>
        </div>
      );
    }

    onDateClick = (date:Date) =>{
      this.setState({
        selectedDate: date
      })

      const dateKey = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
      this.state.dayEvents = this.state.monthEvents[dateKey]
    }

    nextMonth = () =>{
      this.setState({
        currentMonth: addMonths(this.state.currentMonth, 1),
        dayEvents: []
      })
    }

    prevMonth = () =>{
      this.setState({
        currentMonth: subMonths(this.state.currentMonth, 1),
        dayEvents: []
      })
    }

    componentDidMount(): void {
      this.getEventsForMonth(this.state.currentMonth.getMonth()+1,this.state.currentMonth.getFullYear())
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
      this.getEventsForMonth(this.state.currentMonth.getMonth()+1,this.state.currentMonth.getFullYear())
    }

    render() {
        return (
          <div className="calendar">
            {this.renderHeader()}
            {this.renderEventModal()}
            {this.renderDays()}
            {this.renderCells()}
            {this.renderEventList()}
          </div>
        );
    }
}

export default Calendar;