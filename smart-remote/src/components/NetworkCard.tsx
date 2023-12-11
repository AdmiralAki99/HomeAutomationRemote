import React from 'react';

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import BedtimeOffOutlinedIcon from '@mui/icons-material/BedtimeOffOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';

interface NetworkCardStateProps{
    deviceName: string;
    ipAddress: string;
    macAddress: string;
    wakeStatus: boolean;
}

interface NetworkCardProps{
    deviceName: string;
    ipAddress: string;
    macAddress: string;
    wakeStatus: boolean;
}


class NetworkCard extends React.Component<NetworkCardProps>{

    state : NetworkCardStateProps = {
        deviceName: '',
        ipAddress: '',
        macAddress: '',
        wakeStatus: false
    }

    constructor(props:NetworkCardProps){
        super(props)
        this.state = {
            deviceName: this.props.deviceName,
            ipAddress: this.props.ipAddress,
            macAddress: this.props.macAddress,
            wakeStatus: this.props.wakeStatus
        }
        this.wakeButtonClicked = this.wakeButtonClicked.bind(this)
        
    }

    componentDidMount(): void {
        
    }

    componentWillUnmount(): void {
        
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
        
    }

    wakeButtonClicked(){
        this.setState({
            wakeStatus: !this.state.wakeStatus
        })
    }

    renderDeviceInfo(){
        return (
          <div className="row row-start-1 row-end-3 text-white justify-center">
            {this.state.deviceName}
          </div>
        );
    }

    renderDeviceInteractionButtons(){
        return(
            <div className='grid grid-cols-3'>
               <button onClick={this.wakeButtonClicked}>{this.state.wakeStatus? <BedtimeIcon sx={{color:'white'}}></BedtimeIcon>:<BedtimeOffOutlinedIcon sx={{color:'white'}}></BedtimeOffOutlinedIcon>}</button>
               <button><PowerSettingsNewIcon sx={{color:'white'}}></PowerSettingsNewIcon></button>
                <button><RestartAltOutlinedIcon sx={{color:'white'}}></RestartAltOutlinedIcon></button>
            </div>
        )
    }

    render(){
        return (
          <div>
            <a className="block max-w-lg w-80 h-40 p-6 bg-black border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70">
              <div className="grid grid-rows-3 grid-cols-2 gap-4">
                {this.renderDeviceInfo()}
              </div>
              <div>
                {this.renderDeviceInteractionButtons()}
              </div>
            </a>
          </div>
        );
    }
}

export default NetworkCard;