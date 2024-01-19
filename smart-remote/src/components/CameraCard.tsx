import React, { useState } from "react";

import CameraIcon from '@mui/icons-material/Camera';
import InfoIcon from '@mui/icons-material/Info';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import CloseIcon from '@mui/icons-material/Close';


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
    width: 500,
    height: 600,
    bgcolor: '#1C1C1D',
    boxShadow: 24,
    p: 4,
  };

class CameraCard extends React.Component<CameraCardProps>{

    state = {
        cameraName: '',
        cameraUrl: '',
        modalOpen: false
    }

    constructor(props:CameraCardProps){
        super(props)
        this.state = {
            cameraName: this.props.cameraName,
            cameraUrl: this.props.cameraUrl,
            modalOpen: false
        }

        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.renderCameraFeed = this.renderCameraFeed.bind(this)
    }

    componentDidMount(): void {
        
    }

    handleCloseModal = () => {
      this.setState({modalOpen:false})
    }

    handleOpenModal(){
      this.setState({modalOpen:true})
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
            <div>
                <CameraFeedPlayer url={this.state.cameraUrl} />
            </div>
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
            <Modal
            open={this.state.modalOpen}
            onClose={this.handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="block rounded-full">
            <Box sx={style}>
              <div className="flex justify-end items-end pb-6">
                <Button onClick={this.handleCloseModal}><CloseIcon sx={{color:'white'}}></CloseIcon></Button>
              </div>
              <div>{this.renderCameraFeed()}</div>
            </Box>
          </Modal>

          </div>
        );
    }
}

export default CameraCard;