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
import Button from '@mui/material/Button';

interface CalendarComponentState{
    currentMonth: Date,
    selectedDate: Date,
    monthEvents: {[key:string]:any[]},
    dayEvents: any[]
}

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

    // state = {
    //     currentMonth: new Date(),
    //     selectedDate: new Date(),
    //     monthEvents: {[key:String]:any[]},
    //     selectedEvents: []
    // };

    state : CalendarComponentState = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      monthEvents: {},
      dayEvents: [],
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

    handleEventClick(){
      
    }

    renderEventList(){
      return(
        <div>
          <Box>
            <List>
              {this.state.dayEvents.map((event:any)=>{
                return (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar style={{backgroundColor:event.colour}}></Avatar>
                    </ListItemAvatar>
                    {/* <Button variant="text"><ListItemText primary={event.title}></ListItemText></Button> */}
                    <ListItemText primary={event.title} secondary={event.time}></ListItemText>
                    <IconButton edge="end" aria-label="Edit">
                      <EditIcon />
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
            {this.renderDays()}
            {this.renderCells()}
            {this.renderEventList()}
          </div>
        );
    }
}

export default Calendar;