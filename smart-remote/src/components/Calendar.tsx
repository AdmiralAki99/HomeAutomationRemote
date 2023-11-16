import React from "react";
import format from "date-fns/format"
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import addYears from "date-fns/addYears";
import subYears from "date-fns/subYears";

import './Calendar.css'

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
      return(
        <div>
          Days 1
        </div>
      )
    }

    renderCells(){
      return(
        <div>
          Cells 1
        </div>
      )
    }

    onDateClick = (date:Date) =>{

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
          <div>
            {this.renderHeader()}
            {this.renderDays()}
            {this.renderCells()}
          </div>
        );
    }
}

export default Calendar;