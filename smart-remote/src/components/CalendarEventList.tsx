import React from "react";

import { Box } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Done from "@mui/icons-material/Done";

import CalendarEvent from "./CalendarEvent";

interface CalendarEventListProps {
    events: any[];
}

class CalendarEventList extends React.Component<CalendarEventListProps>{

    state = {
        events: this.props.events,
        modalOpen: false,
        selectedEvent: null
    }

    constructor(props: CalendarEventListProps){
        super(props);
        this.state = {
            events: props.events,
            modalOpen: false,
            selectedEvent: null
        }
    }

    closeEventModal(){
        this.setState({
            modalOpen: false
        })
    }

  render() {
    return (
      <Box sx={{bgcolor: "transparent"}}>
        <div className="pl-2 pt-2 pr-2">
        <div className="flex flex-col w-full h-full bg-noir rounded-xl">
          {
            this.props.events.map((event) => {
              return (
                <button className="flex flex-row justify-between" onClick={()=>{
                    this.setState({modalOpen: true})
                    this.setState({selectedEvent: event})
                }}>
                  <div className="flex flex-col pl-2 text-white">
                    <div>{event.title}</div>
                  </div>
                  <div>
                    <button className="pr-2">
                      <Done sx={{ color: "white" }} />
                    </button>
                    <button className="pr-2">
                      <DeleteIcon sx={{ color: "white" }} />
                    </button>
                  </div>
                </button>
              );
            })
          }
          {this.state.modalOpen? <CalendarEvent event={this.state.selectedEvent} handleCloseModal={this.closeEventModal.bind(this)} modalOpen={this.state.modalOpen}/>: <div></div>}
        </div>
      </div>
      </Box>
    );
  }
}

export default CalendarEventList;