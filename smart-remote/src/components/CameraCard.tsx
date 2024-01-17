import React from "react";

import CameraIcon from '@mui/icons-material/Camera';
import InfoIcon from '@mui/icons-material/Info';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

interface CameraCardProps{
    cameraName: string;
    cameraUrl: string;
}

class CameraCard extends React.Component<CameraCardProps>{

    state : CameraCardProps = {
        cameraName: '',
        cameraUrl: ''
    }

    constructor(props:CameraCardProps){
        super(props)
        this.state = {
            cameraName: this.props.cameraName,
            cameraUrl: this.props.cameraUrl
        }
    }

    componentDidMount(): void {
        
    }

    componentDidUpdate(prevProps: Readonly<CameraCardProps>, prevState: Readonly<{}>, snapshot?: any): void {
        
    }

    renderTitle(){
        return(
            <div>
                {this.state.cameraName}
            </div>
        )
    }

    renderActionButtons(){
        return(
            <div className="grid grid-rows-3 gap-4 justify-center">
                <button className="text-white"><CameraIcon sx={{color:'white'}}></CameraIcon></button>
                <button><InfoIcon sx={{color:"white"}}></InfoIcon></button>
                <button><PowerSettingsNewIcon sx={{color:"white"}}></PowerSettingsNewIcon></button>
            </div>
        )
    }

    render(){
        return (
          <div>
            <a className="block max-w-lg w-60 h-40 p-6 bg-greyCard bordershadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70 rounded-3xl">
              <div className="grid grid-rows-3 grid-cols-2 gap-20">
                {this.renderTitle()}
                <div>{this.renderActionButtons()}</div>
              </div>
              
            </a>
          </div>
        );
    }
}

export default CameraCard;