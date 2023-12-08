import React from "react";
import { ReactDOM } from "react";
import './DatePicker.css'

import { startOfMonth } from "date-fns";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import endOfMonth from "date-fns/endOfMonth";
import addDays from "date-fns/addDays";
import format from "date-fns/format"
import addMonths from "date-fns/addMonths";
import isSameMonth from "date-fns/isSameMonth";
import isSameDay from "date-fns/isSameDay";

interface DatePickerComponentState{
    selectedDate: Date,
    open: boolean
}

class DatePicker extends React.Component{

    state = {
        selectedDate: new Date(),
        open: false
    }

    weekdayMap = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    monthMap = ['January','February','March','April','May','June','July','August','September','October','November','December']


    constructor(props:any){
        super(props)
        this.state = {
            selectedDate: new Date(),
            open: false
        }
        this.createPopup = this.createPopup.bind(this)
    }

    // Create a constructor for the class

    createPopup(){
        if(this.state.open){
            this.showDatePicker(false)
        }else{
            this.showDatePicker(true)
        }
    }

    renderCells(){
        const selectedDate = this.state.selectedDate

        const mStart = startOfMonth(selectedDate.getMonth())
        const mEnd = endOfMonth(selectedDate.getMonth())

        return(
            <div className="date-picker-days">
                {this.renderDates()}
            </div>
        )

    }

    renderDates(){
        const selectedDate = this.state.selectedDate

        const mStart = startOfMonth(selectedDate.getMonth()-1)
        const mEnd = endOfMonth(mStart)
        
        console.log(mStart)

        const startDate = startOfWeek(mStart)
        const endDate = endOfWeek(mEnd)

        const rows = []

        let days = []
        let day = startDate
        let formattedDate = ""

        while(day <= endDate){
            for(let i=0; i<7; i++){
                formattedDate = format(day, "d")
                const cloneDay = day
                days.push(
                    <div
                        className={`col cell ${
                            !isSameMonth(day, mStart)
                            ? "disabled"
                            : isSameDay(day, selectedDate) ? "selected" : ""
                        }`}
                        key={day.toString()}
                        onClick={() => {console.log("Clicked on: ", cloneDay)}}
                    >
                        <span className="number">{formattedDate}</span>
                    </div>
                )
                day = addDays(day, 1)
            }
            rows.push(
                <div className="row" key={day.toString()}>
                    {days}
                </div>
            )
            days = []
        }
        return <div className="body">{rows}</div>
    }

    showDatePicker(displayStatus: boolean){
        this.setState({
            open: displayStatus
        })
    }

    componentWillUnmount(): void {
        
    }

    componentDidMount(): void {
        this.setState({
            selectedDate: new Date(),
            open: false
        })
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
        
    }

    render(){

        return(
            <div className="date-picker">
               <div className="date-picker-input" onClick={this.createPopup}>
                    <input type="date"/>
               </div>
               {
                this.state.open? (
                    <div>
                        <div className="date-picker-container">
                            <div>
                                Date Header
                            </div>
                            <div>
                                {this.renderCells()}
                            </div>
                        </div>
                    </div>
                ): ''
               }
            </div>
        )
        
    }

}

export default DatePicker;