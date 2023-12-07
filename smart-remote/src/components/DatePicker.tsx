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
                                Date Body
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