import React, { useState, useEffect } from "react";

import CalendarForm from "./CalendarForm";

import Button from '@mui/material/Button';
import { Add, ArrowBack } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const CalendarScreenNavBar = ({navigation,destination}) => {
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [startScan, setStartScan] = useState(false);
    const [scanList, setScanList] = useState([]); // [{name: "Light1", model: "model1"},{name: "Light2", model: "model2"}
    const menuOpen = Boolean(menuAnchor);
  
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [calendarType, setCalendarType] = useState('');
    const [color, setColor] = useState('#007bff'); // Default color
    const [allDay, setAllDay] = useState(false);
    const [status, setStatus] = useState('');
  
    const handleStartTimeChange = time => {
      setStartTime(time);
    };
  
    const handleEndTimeChange = time => {
      setEndTime(time);
    };
  
    const handleColorChange = event => {
      setColor(event.target.value);
    };
  
    const handleScanList = async () => {
      fetch("/light/scan", { method: "GET" }).then((response) => {
        response.json().then((data) => {
          setScanList(data);
        });
      });
      console.log(scanList);
    }
  
    useEffect(()=>{
      handleScanList();
      console.log("Start Scan")
    },[])
  
    const handleOpenModal = () => {
      setStartScan(true);
      setModalOpen(true);
    }
  
    const handleCloseModal = () => {
      setModalOpen(false);
    }
  
    const handleOpenMenu = (event) => {
      setMenuAnchor(event.currentTarget);
    };
  
    const handleCloseMenu = () => {
      setMenuAnchor(null);
    };
  
    const handleSubmit = event => {
      event.preventDefault();
      // Handle form submission logic here
      console.log({
        title,
        description,
        startTime,
        endTime,
        calendarType,
        color,
        allDay,
        status
      });
      // You can add further logic here, like sending data to an API or performing other actions.
    };
  
    return (
      <div className="flex bg-home w-screen h-9 justify-between items-center ">
        <Button
          onClick={() => {
            navigation.navigate(destination);
          }}
        >
          <ArrowBack sx={{ color: "white" }} fontSize="medium" />
        </Button>
        <div>
          <Button
            id="add-button"
            aria-controls={menuOpen ? "light-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? "true" : undefined}
            onClick={handleOpenModal}
          >
            <Add sx={{ color: "white" }} fontSize="medium" />
          </Button>
          {(modalOpen == true)? <div className="fixed z-10"><CalendarForm modalOpen={modalOpen} handleCloseModal={handleCloseModal}/></div>:<div></div>}
        </div>
      </div>
    );
  };

  export default CalendarScreenNavBar;
  