import { PropTypes } from "prop-types";
import { useState, useCallback, useEffect, useRef } from "react";
import classnames from "classnames";
import { Menu, Tune } from "@mui/icons-material";
import { NavbarMode } from "../App";

const HomeScreenNavbar = () => {
    return(
        <div className="flex bg-noir w-screen h-9 justify-end ">
            <Menu sx={{color:'white'}} fontSize="large"/>
        </div>
    )

}

const ScreenNavbar = () =>{

}

export {HomeScreenNavbar,ScreenNavbar};