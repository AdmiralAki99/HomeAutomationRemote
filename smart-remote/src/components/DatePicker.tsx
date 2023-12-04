import React from "react";

interface DatePickerComponentState{
    selectedDate: Date,
    open: boolean
}

class DatePicker extends React.Component{

    state: DatePickerComponentState = {
        selectedDate: new Date(),
        open: false
    }

    render(){

        return(
            <div>
                Date Picker
            </div>
        )
        
    }

}