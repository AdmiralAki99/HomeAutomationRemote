import { PropTypes } from "prop-types";
import { useState, useCallback, useEffect, useRef } from "react";
import classnames from "classnames";
import {Tune, ArrowBack, Add } from "@mui/icons-material";
import { NavbarMode } from "../App";

import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TextField from "@mui/material/TextField";
import { DataGrid, GridColDef, GridValueGetterParams, GridApi } from '@mui/x-data-grid';
import CalendarScreen from "../screens/CalendarScreen";

import './CalendarNavBar.css'

const HomeScreenNavbar = () => {
    return(
        <div className="flex bg-home w-screen h-9 justify-end items-center ">
            {/* <Menu sx={{color:'white'}} fontSize="medium"/> */}
        </div>
    )

}

//TODO: Remove Splash animation from button behaviour

const ScreenNavbar = ({navigation,destination}) =>{
    return (
      <div className="flex bg-home w-screen h-9 justify-start items-center ">
        <Button onClick={
            () => {
              navigation.navigate(destination);
            }    
        }>
          <ArrowBack sx={{ color: "white" }} fontSize="medium" />
        </Button>
      </div>
    );
}

//TODO: Create Different Button Functions To Communicate With Backend

const style = {
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

const columns = [
  {
    field: 'Name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'Model',
    headerName: 'Model',
    width: 80,
    editable: false,
  },
  {
    field: 'State',
    headerName: 'State',
    width: 40,
    editable: true,
  },
  {
    field: 'Actions',
    headerName: 'Actions',
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation();
        const api = params.api;
       
        return <Button>Click</Button>
      };
    }
  }
];

// const rows = [
//   { Name: 'Snow', Model: 'Jon', State: 35 },
//   { Name: 'Lannister', Model: 'Cersei', State: 42 },
//   { Name: 'Lannister', Model: 'Jaime', State: 45 },
//   { Name: 'Stark', Model: 'Arya', State: 16 },
//   { Name: 'Targaryen', Model: 'Daenerys', State: null },
//   { Name: 'Melisandre', Model: null, State: 150 },
//   { Name: 'Clifford', Model: 'Ferrara', State: 44 },
//   { Name: 'Frances', Model: 'Rossini', State: 36 },
//   { Name: 'Roxie', Model: 'Harvey', State: 65 },
// ];


const LightScreenNavBar = ({navigation,destination}) => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [startScan, setStartScan] = useState(false);
  const [scanList, setScanList] = useState([]); // [{name: "Light1", model: "model1"},{name: "Light2", model: "model2"}
  const menuOpen = Boolean(menuAnchor);

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
          onClick={handleOpenMenu}
        >
          <Add sx={{ color: "white" }} fontSize="medium" />
        </Button>
        <Menu
          id="light-menu"
          anchorEl={menuAnchor}
          open={menuOpen}
          onClose={handleCloseMenu}
          MenuListProps={{ "aria-labelledby": "add-button" }}
        >
          <MenuItem onClick={handleOpenModal}>Add Lights</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Manage Lights</MenuItem>
        </Menu>

        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex justify-end items-end">
              <Button onClick={handleCloseModal}>Close</Button>
              <Button onClick={handleScanList}>Scan</Button>
              <Button>Connect</Button>
            </div>
            <DataGrid rows={scanList} columns={columns} checkboxSelection ></DataGrid>
          </Box>
        </Modal>

      </div>
    </div>
  );
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
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="calendar-form">
              <h2>Add Event</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Start Time</label>
                  <DatePicker
                    selected={startTime}
                    onChange={handleStartTimeChange}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeIntervals={15}
                    placeholderText="Select start time"
                  />
                </div>
                <div className="form-group">
                  <label>End Time</label>
                  <DatePicker
                    selected={endTime}
                    onChange={handleEndTimeChange}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeIntervals={15}
                    placeholderText="Select end time"
                  />
                </div>
                <div className="form-group">
                  <label>Calendar Type</label>
                  <input
                    type="text"
                    value={calendarType}
                    onChange={(e) => setCalendarType(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Color</label>
                  <input
                    type="color"
                    value={color}
                    onChange={handleColorChange}
                  />
                </div>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={allDay}
                      onChange={() => setAllDay(!allDay)}
                    />
                    All Day
                  </label>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Select status</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <button type="submit">Add Event</button>
              </form>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};


ScreenNavbar.propTypes = {
    navigation : PropTypes.any.isRequired,
    destination : PropTypes.string.isRequired,
}

LightScreenNavBar.propTypes = {
  navigation : PropTypes.any.isRequired,
  destination : PropTypes.string.isRequired,
}

CalendarScreenNavBar.propTypes = {
  navigation : PropTypes.any.isRequired,
  destination : PropTypes.string.isRequired,
}

export {HomeScreenNavbar,ScreenNavbar,LightScreenNavBar,CalendarScreenNavBar};