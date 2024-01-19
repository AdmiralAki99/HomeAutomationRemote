import React, { useState } from "react";

import CameraIcon from '@mui/icons-material/Camera';
import InfoIcon from '@mui/icons-material/Info';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import CameraFeedPlayer from "./CameraFeedPlayer";

interface CameraCardProps{
    cameraName: string;
    cameraUrl: string;
}

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

class CameraCard extends React.Component<CameraCardProps>{

    state : CameraCardProps = {
        cameraName: '',
        cameraUrl: '',
    }

    modalOpen = false

    constructor(props:CameraCardProps){
        super(props)
        this.state = {
            cameraName: this.props.cameraName,
            cameraUrl: this.props.cameraUrl
        }
        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.renderCameraFeed = this.renderCameraFeed.bind(this)
    }

    componentDidMount(): void {
        
    }

    componentDidUpdate(prevProps: Readonly<CameraCardProps>, prevState: Readonly<{}>, snapshot?: any): void {
        console.log(this.modalOpen)
    }

    handleCloseModal = () => {
        console.log("Closing Modal")
        console.log(this.modalOpen)
        this.modalOpen = false
        console.log(this.modalOpen)
    }

    handleOpenModal(){
        console.log("Opening Modal")
        this.modalOpen = true
        console.log(this.modalOpen)
    }

    renderTitle(){
        return(
            <div>
                {this.state.cameraName}
            </div>
        )
    }

    renderCameraFeed(){
        return(
            <Modal
            open={this.modalOpen}
            onClose={this.handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="flex justify-end items-end">
                <Button onClick={this.handleCloseModal}>Close</Button>
              </div>
            </Box>
          </Modal>
        )
    }

    renderActionButtons(){
        return (
          <div className="grid grid-rows-3 gap-4 justify-center">
            <button className="text-white" onClick={this.handleOpenModal}>
              <CameraIcon sx={{ color: "white" }}></CameraIcon>
            </button>
            <button>
              <InfoIcon sx={{ color: "white" }}></InfoIcon>
            </button>
            <button>
              <PowerSettingsNewIcon
                sx={{ color: "white" }}
              ></PowerSettingsNewIcon>
            </button>
          </div>
        );
    }

    render(){
        return (
          <div>
            <a className="block max-w-lg w-60 h-40 p-6 bg-black border border-white shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70 rounded-3xl">
              <div className="grid grid-rows-1 grid-cols-2 gap-4">
                {this.renderTitle()}
                <div>{this.renderActionButtons()}</div>
              </div>
            </a>
            {(this.modalOpen)?<CameraFeedPlayer url="/link"></CameraFeedPlayer>:null}
          </div>
        );
    }
}

export default CameraCard;