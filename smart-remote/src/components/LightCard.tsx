import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import LightSlider from './LightSlider';
import './LightCard.css';

interface LightCardProps {
    powerState: boolean;
    id: number;
    name: string;
    brightness: number;
}

class LightCard extends React.Component<LightCardProps> {
  state = {
    powerState: false,
    id: -1,
    name: "",
    brightness: 0,
    color: "",
    ip: "",
    checked : false,
  };

  constructor(props: LightCardProps) {
    super(props);
    this.handlePowerState = this.handlePowerState.bind(this);
    this.state = {
      powerState: props.powerState,
      id: props.id,
      name: props.name,
      brightness: props.brightness,
      color: "",
      ip: "",
      checked: false,
    };
  }

  onComponentDidMount() {
    console.log("Component Mounted")
    console.log(this.state.brightness)
  }

  async componentDidUpdate(prevProps: Readonly<LightCardProps>, prevState: Readonly<LightCardProps>, snapshot?: any){
    // this.handleBrightnessUpdate(this.state.brightness)
    if (this.state.checked == true && prevProps.brightness != this.state.brightness){
      // this.setState({brightness: this.state.brightness})
      this.setState({brightness: this.props.brightness})
      this.updateLightBrightness(this.state.brightness)
    }
  }

  updateLightBrightness = async (brightness: number) => {
      axios.post("/light/set/brightness", {
        id: this.state.id,
        brightness: brightness,
      }).catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log('Error', err.message);
        }
        console.log(err.config);
      })
    
  }

  handlePowerState = () => {
    if (this.state.powerState) {
        axios.post("/light/turn/off", {
          id: this.state.id,
        });
      this.setState({ powerState: false });
    } else {
        axios.post("/light/turn/on", {
          id: this.state.id,
        });
      this.setState({ powerState: true });
    }
  };

  handleBrightnessUpdate = async (brightness: number) => {
    // this.setState({ brightness: brightness });
    this.state.brightness = brightness
    this.setState({})
  }

  render() {
    return (
      <div className='flex gap-4 items-center'>
        <div className='checkbox-container'>
        <input type="checkbox" checked={this.state.checked} className={(this.state.checked == true)? "Checked":"Unchecked"} onChange={() => {
            if (this.state.checked == false){
                this.setState({checked: true})
            }
            else{
                this.setState({checked: false})
            }

        }} />
        </div>
        <div>
          <a className="block max-w-lg w-60 h-40 p-6 bg-black border border-gray-200 rounded-md shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70">
            <div className="grid grid-cols-2 gap-5">
              <div
                className="row row-start-1 row-end-3 text-white"
                onClick={() => {}}
              >
                {this.state.name}
              </div>
              <div className="row row-start-3 row-end-4 text-white">
                <div className="grid grid-rows-1 grid-cols-2 gap-10">
                  <div>
                    <button onClick={this.handlePowerState}>
                      {this.state.powerState == true ? (
                        <PowerSettingsNewIcon
                          sx={{ color: "white", fontSize: "large" }}
                        />
                      ) : (
                        <PowerSettingsNewIcon
                          sx={{ color: "gray", fontSize: "large" }}
                        />
                      )}
                    </button>
                  </div>
                  <div>
                    <button>
                      <ColorLensIcon
                        sx={{ color: "white", fontSize: "large" }}
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex row-start-2 row-end-5 items-center justify-center h-full w-full object-fill pt-6 pl-6">
                <LightSlider
                  min={0}
                  value={this.state.brightness}
                ></LightSlider>
              </div>
            </div>
          </a>
        </div>
      </div>
    );
  }
}

export default LightCard;