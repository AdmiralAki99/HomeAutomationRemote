import React from 'react'
import { View } from 'react-native'

import LightScreen from './LightScreen'
import BlindsScreen from './BlindsScreen'

import { LightbulbFill, House } from 'react-bootstrap-icons'

type SmartDeviceScreenProps = {
  navigation: any
  route: any
}

class SmartDeviceScreen extends React.Component<SmartDeviceScreenProps> {
  state = {
    currentScreen: 'Light'
  }

  constructor(props: SmartDeviceScreenProps) {
    super(props)
  }

  renderLightScreen() {
    return (
      <View>
        <LightScreen navigation={this.props.navigation} />
      </View>
    )
  }

  renderBlindsScreen() {
    return (
      <View>
        <BlindsScreen />
      </View>
    )
  }

  render() {
    return (
      <div>
        {this.state.currentScreen === 'Light'
          ? this.renderLightScreen()
          : this.renderBlindsScreen()}
        <div className="fixed w-full h-16 max-w-lg -translate-x-1/2 bg-noir border border-black rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
          <div className="grid h-full max-w-lg grid-cols-2 mx-auto">
            <button onClick={() => this.setState({ currentScreen: 'Light' })}>
              <LightbulbFill color="white" className="h-6 w-6 mx-auto" />
            </button>
            <button onClick={() => this.setState({ currentScreen: 'Blinds' })}>
              <House color="white" className="h-6 w-6 mx-auto" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default SmartDeviceScreen
