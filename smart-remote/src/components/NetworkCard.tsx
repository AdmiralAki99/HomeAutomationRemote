import React from 'react';

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import BedtimeOffOutlinedIcon from '@mui/icons-material/BedtimeOffOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import CellTowerIcon from '@mui/icons-material/CellTower';

import axios from 'axios';

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
        this.powerButtonClicked = this.powerButtonClicked.bind(this)
        this.pingButtonClicked = this.pingButtonClicked.bind(this)
        
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

    powerButtonClicked(){
      
    }

    pingButtonClicked(){
      const reqOpt = {ip: "192.168.29.184"}
      // axios.post("/network/ping",reqOpt).then((response)=>{
      //   console.log(response)
      // })
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
            <div className='grid grid-cols-4'>
                <button onClick={this.wakeButtonClicked}>{this.state.wakeStatus? <BedtimeIcon sx={{color:'white'}}></BedtimeIcon>:<BedtimeOffOutlinedIcon sx={{color:'white'}}></BedtimeOffOutlinedIcon>}</button>
                <button><PowerSettingsNewIcon sx={{color:'white'}}></PowerSettingsNewIcon></button>
                <button><RestartAltOutlinedIcon sx={{color:'white'}}></RestartAltOutlinedIcon></button>
                <button onClick={this.pingButtonClicked}><CellTowerIcon sx={{color:'white'}}></CellTowerIcon></button>
            </div>
        )
    }

    render(){
        return (
          <div>
            <a className="block max-w-lg w-80 h-40 p-6 bg-black bordershadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70 rounded-3xl">
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