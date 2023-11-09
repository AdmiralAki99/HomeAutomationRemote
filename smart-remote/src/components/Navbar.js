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
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

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
];

const rows = [
  { id: 1, Name: 'Snow', Model: 'Jon', State: 35 },
  { id: 2, Name: 'Lannister', Model: 'Cersei', State: 42 },
  { id: 3, Name: 'Lannister', Model: 'Jaime', State: 45 },
  { id: 4, Name: 'Stark', Model: 'Arya', State: 16 },
  { id: 5, Name: 'Targaryen', Model: 'Daenerys', State: null },
  { id: 6, Name: 'Melisandre', Model: null, State: 150 },
  { id: 7, Name: 'Clifford', Model: 'Ferrara', State: 44 },
  { id: 8, Name: 'Frances', Model: 'Rossini', State: 36 },
  { id: 9, Name: 'Roxie', Model: 'Harvey', State: 65 },
];


const LightScreenNavBar = ({navigation,destination}) => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const menuOpen = Boolean(menuAnchor);

  const handleOpenModal = () => {
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
            <DataGrid rows={rows} columns={columns} checkboxSelection ></DataGrid>
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

export {HomeScreenNavbar,ScreenNavbar,LightScreenNavBar};