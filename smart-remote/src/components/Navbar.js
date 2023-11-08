import { PropTypes } from "prop-types";
import { useState, useCallback, useEffect, useRef } from "react";
import classnames from "classnames";
import {Tune, ArrowBack, Add } from "@mui/icons-material";
import { NavbarMode } from "../App";

import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

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

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
          <MenuItem onClick={handleCloseMenu}>Add Lights</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Manage Lights</MenuItem>
        </Menu>
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