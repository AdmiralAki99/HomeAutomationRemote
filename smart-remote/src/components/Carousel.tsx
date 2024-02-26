import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import Slide from "@mui/material";
import Card from "@mui/material";

import React from "react";

class Carousel extends React.Component{
    constructor(props:any){
        super(props);
    }

    render(){
        return(
            <div>
                <Box>
                    <IconButton>
                        <NavigateBefore/>
                    </IconButton>
                    <IconButton>
                        <NavigateNext/>
                    </IconButton>
                </Box>
            </div>
        )
    }
}

export default Carousel;
