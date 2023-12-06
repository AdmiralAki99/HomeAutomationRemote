import React from "react";
import { ReactDOM } from "react";
import './DatePicker.css'

interface DatePickerComponentState{
    selectedDate: Date,
    open: boolean
}

class DatePicker extends React.Component{

    state = {
        selectedDate: new Date(),
        open: false
    }

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
        console.log(this.state.open)
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

                        </div>
                    </div>
                ): ''
               }
            </div>
        )
        
    }

}

export default DatePicker;