import { Component } from 'react'
import { View } from 'react-native'

import serverAPI from '../ServerAPI'
import Navbar from '../components/Navbar'

import {
  Power,
  HouseDoor,
  List,
  ArrowLeft,
  RewindFill,
  FastForwardFill,
  PlayFill,
  PauseFill,
  ChevronLeft,
  PlusLg,
  DashLg
} from 'react-bootstrap-icons'

import '../styles/Remote.css'

type RemoteScreenProps = {
  navigation: any
  route: any
}

class RemoteScreen extends Component<RemoteScreenProps> {
  state = {
    activeDirection: '',
    playbackState: 'paused'
  }

  async handleDirectionClick(value: string) {
    await serverAPI.get(`/remotes/send/key?query=${value}`)
  }

  async handleMenuClick() {
    await serverAPI.get(`/remotes/send/key?query=menu`)
  }

  async handleVolumeClick(value: string) {
    await serverAPI.get(`/remotes/send/key?query=${value}`)
  }

  async handlePowerToggle() {
    await serverAPI.get(`/remotes/send/key?query=power`)
  }

  async handlePlayPause() {
    await serverAPI.get(`/remotes/send/key?query=play_pause`)
    this.setState({ playbackState: this.state.playbackState === 'paused' ? 'playing' : 'paused' })
  }

  async handleRewind() {
    await serverAPI.get(`/remotes/send/key?query=rewind`)
  }

  async handleFastForward() {
    await serverAPI.get(`/remotes/send/key?query=fast_forward`)
  }

  async handleHome() {
    await serverAPI.get(`/remotes/send/key?query=home`)
  }

  async handleBack() {  
    await serverAPI.get(`/remotes/send/key?query=back`)
  }

  render() {
    return (
      <View>
        <div className="bg-noir w-full h-screen">
          <Navbar
            leftItems={[
              <button
                className="flex w-12 h-12 bg-noir text-primary_text items-center justify-center "
                onClick={() => this.props.navigation.pop()}
              >
                <ChevronLeft color="white" />
              </button>
            ]}
            rightItems={[]}
          />
          <div className="w-full flex justify-center items-center">
            <button
              className="w-10 h-10 rounded-full bg-primary translate-y-20 flex items-center justify-center"
              onClick={this.handlePowerToggle}
            >
              <Power color="white" size={'25px'} />
            </button>
          </div>
          <div className="w-full flex justify-between items-center translate-y-24">
            <button
              className="w-10 h-10 rounded-full translate-y-20 translate-x-20 flex items-center justify-center"
              onClick={this.handleBack}
            >
              <ArrowLeft color="white" size={'30px'} />
            </button>
            <button
              className="w-10 h-10 rounded-full translate-y-20 flex items-center justify-center"
              onClick={this.handleHome}
            >
              <HouseDoor color="white" size={'30px'} />
            </button>
            <button
              className="w-10 h-10 rounded-full translate-y-20 -translate-x-20 flex items-center justify-center"
              onClick={this.handleMenuClick}
            >
              <List color="white" size={'30px'} />
            </button>
          </div>
          <div className="dpad-container top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/4">
            <div className="dpad">
              <button
                className={`dpad-button dpad-up ${this.state.activeDirection === 'up' ? 'active' : ''}`}
                onClick={() => this.handleDirectionClick('dpad_up')}
              />
              <button
                className={`dpad-button dpad-down ${this.state.activeDirection === 'down' ? 'active' : ''}`}
                onClick={() => this.handleDirectionClick('dpad_down')}
              />
              <button
                className={`dpad-button dpad-left ${this.state.activeDirection === 'left' ? 'active' : ''}`}
                onClick={() => this.handleDirectionClick('dpad_left')}
              />
              <button
                className={`dpad-button dpad-right ${this.state.activeDirection === 'right' ? 'active' : ''}`}
                onClick={() => this.handleDirectionClick('dpad_right')}
              />
              <button
                className="dpad-button dpad-center"
                onClick={() => this.handleDirectionClick('dpad_center')}
              />
              <button
                className="channel-button ch-minus"
                onClick={() => {
                  this.handleVolumeClick('volume_down')
                }}
              >
                <DashLg color="white" size={'30px'} />
              </button>
              <button
                className="channel-button ch-plus"
                onClick={() => {
                  this.handleVolumeClick('volume_up')
                }}
              >
                <PlusLg color="white" size={'30px'} />
              </button>
            </div>
          </div>
          <div className="w-full flex justify-between items-center translate-y-60">
            <button
              className="w-10 h-10 rounded-full translate-y-20 translate-x-20 flex items-center justify-center"
              onClick={this.handleRewind}
            >
              <RewindFill color="white" size={'30px'} />
            </button>
            <button
              className="w-10 h-10 rounded-full translate-y-20 flex items-center justify-center"
              onClick={()=>{}}
            >
              {this.state.playbackState === 'paused' ? (
                <PauseFill color="white" size={'30px'} />
              ) : (
                <PlayFill color="white" size={'30px'}/>
              )}
            </button>
            <button
              className="w-10 h-10 rounded-full translate-y-20 -translate-x-20 flex items-center justify-center"
              onClick={this.handleFastForward}
            >
              <FastForwardFill color="white" size={'30px'} />
            </button>
          </div>
        </div>
      </View>
    )
  }
}

export default RemoteScreen
