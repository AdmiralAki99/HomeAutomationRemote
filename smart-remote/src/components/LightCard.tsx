import React from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import LightSlider from './LightSlider';


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
    checked : false
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

  }

  onComponentDidUpdate() {
    this.handleBrightnessUpdate(this.state.brightness);
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

  handleBrightnessUpdate = (brightness: number) => {
    if(this.state.checked == true){
        this.setState({
            brightness: this.state.brightness+10
           })
    }
  }

  render() {
    return (
      <div>
        <input type="checkbox" checked={this.state.checked} onChange={() => {
            this.setState({checked: !this.state.checked})

        }} />
        <div>
          <a className="block max-w-lg w-80 h-40 p-6 bg-black border border-gray-200 rounded-md shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70">
            <div className="grid grid-rows-4 grid-cols-2 gap-4">
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
                  onChange={() => {}}
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