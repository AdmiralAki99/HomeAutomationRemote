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

class Calendar extends React.Component{

    state = {
        currentMonth: new Date(),
        selectedDate: new Date()
    };

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
            <div className={`col cell ${!isSameMonth(temp,mStart)? "disabled":isSameDay(currentDay,selectedDate)? "selected":""}`} onClick={()=>this.onDateClick(currentDay)}>
              <span className="number">{formattedDate}</span>
              <span className="bg">{formattedDate}</span>
              <span className="event bg-bubblegum"></span>
              <span className="event bg-cyan-500"></span>
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

    onDateClick = (date:Date) =>{
      this.setState({
        selectedDate: date
      })
      console.log(date)
    }

    nextMonth = () =>{
      this.setState({
        currentMonth: addMonths(this.state.currentMonth, 1)
      })
    }

    prevMonth = () =>{
      this.setState({
        currentMonth: subMonths(this.state.currentMonth, 1)
      })
    }

    render() {
        return (
          <div className="calendar">
            {this.renderHeader()}
            {this.renderDays()}
            {this.renderCells()}
          </div>
        );
    }
}

export default Calendar;