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
import TextField from "@mui/material/TextField";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import axios from "axios";

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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="grid grid-cols-2">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Event
                  </Typography>
                  <IconButton edge="end" aria-label="Edit">
                    <DoneIcon />
                  </IconButton>
                </div>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Title
                </Typography>
                <TextField id="outlined-basic" variant="outlined" />
                <Button variant="contained">Scan</Button>
                <div>
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="All Day"
                    />
                  </FormGroup>
                  <div className="grid grid-cols-3 pl-2">
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Start Date
                    </Typography>
                    <DatePicker />
                    <TimePicker />
                  </div>
                  <div className="grid grid-cols-3 pl-2">
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      End Date
                    </Typography>
                    <DatePicker />
                    <TimePicker />
                  </div>
                  <div className="grid grid-cols-2 pl-2">
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Completed
                    </Typography>
                    <Checkbox sx={{}} />
                  </div>
                  <div>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Description
                    </Typography>
                    <TextField
                      id="standard-multiline-static"
                      multiline
                      rows={4}
                      defaultValue="Description"
                      variant="standard"
                    />
                  </div>
                  <div>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Colour
                    </Typography>
                  </div>
                </div>
              </LocalizationProvider>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

const NetworkScreenNavBar = ({navigation,destination}) => {

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [startScan, setStartScan] = useState(false);
  const [scanList, setScanList] = useState([]);
  const [ipAddress, setIpAddress] = useState("")
  const menuOpen = Boolean(menuAnchor);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [calendarType, setCalendarType] = useState('');
  const [color, setColor] = useState('#007bff'); // Default color
  const [allDay, setAllDay] = useState(false);
  const [status, setStatus] = useState('');

  const networkColumnFormat = [
    {
      field: 'id',
      headerName: 'ID', 
      width: 30 
    },
    {
      field: 'hostname',
      headerName: 'hostname',
      width: 150,
      editable: true,
    },
    {
      field: 'ip',
      headerName: 'IP',
      width: 150,
      editable: false,
    },
    {
      field: 'mac',
      headerName: 'Mac',
      width: 150,
      editable: false,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
        };
  
        return <Button onClick={onClick}>Add</Button>;
      }
    },
  ]

  const handleStartTimeChange = time => {
    setStartTime(time);
  };

  const handleEndTimeChange = time => {
    setEndTime(time);
  };

  const handleColorChange = event => {
    setColor(event.target.value);
  };

  const handleScanList = async (ip_addr) => {
    const reqOpt = {ip:ip_addr}
    axios.post("/network/scan",reqOpt).then((response) => {
      setScanList(response.data.devices);
    })
  }

  const scanButtonPushed = () =>{
    handleScanList(ipAddress)
  }

  const handleIPChange = (event) => {
    console.log(ipAddress)
  }

  useEffect(()=>{
  },[])

  const handleOpenModal = () => {
    setStartScan(true);
    handleScanList("")
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Network Devices
            </Typography>
            <div>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                IP Address
              </Typography>
              <TextField id="outlined-basic" variant="outlined" onChange={handleIPChange} />
              <Button variant="contained" onClick={scanButtonPushed}>Scan</Button>
            </div>
            <DataGrid
              rows={scanList}
              columns={networkColumnFormat}
              checkboxSelection
              sx={{ height: 420, width: '100%' }}
            ></DataGrid>
          </Box>
        </Modal>
      </div>
    </div>
  );

}


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

export {HomeScreenNavbar,ScreenNavbar,LightScreenNavBar,CalendarScreenNavBar,NetworkScreenNavBar};