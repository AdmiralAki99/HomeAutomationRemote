import React from 'react'
import { View } from 'react-native'

import '../styles/LightScreen.css'

import LightCard from '../components/LightCard'
import Navbar from '../components/Navbar'
import { ChevronLeft, PlusLg } from 'react-bootstrap-icons'

type LightScreenProps = {
  navigation: any
}

class LightScreen extends React.Component<LightScreenProps> {
  state = {
    lightLevel: 0,
    popUpMenuClicked: false
  }

  constructor(props) {
    super(props)
    this.state = {
      lightLevel: 50,
      popUpMenuClicked: false
    }
    this.lightLevelListener = this.lightLevelListener.bind(this)
  }

  lightLevelListener(event) {
    this.setState({
      lightLevel: parseInt(event.target.value, 10)
    })
  }

  renderLightBar() {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <input
          type="range"
          className="slider"
          value={this.state.lightLevel}
          onChange={this.lightLevelListener}
        />
      </div>
    )
  }

  renderLightCards() {
    return (
      <div className="grid grid-cols-1 p-8 gap-4 max-h-4/5">
        <LightCard />
        <LightCard />
        <LightCard />
        <LightCard />
        <LightCard />
      </div>
    )
  }

  renderPopUpMenu() {
    return (
      <div className="fixed z-10 bg-primary_text w-[25%] h-[15%] rounded-lg top-10 right-0 shadow-sm shadow-card_bg">
        <ul className="flex flex-col items-center justify-center gap-4 p-4 text-lg">
          <li>Add Light</li>
          <li>Remove Light</li>
          <li>Update List</li>
        </ul>
      </div>
    )
  }

  render() {
    return (
      <View>
        <div className="h-screen bg-home">
          <Navbar
            leftItems={[
              <button
                className="flex w-12 h-12 bg-noir text-primary_text rounded-sm items-center justify-center"
                onClick={() => {
                  this.props.navigation.navigate('Home')
                }}
              >
                <ChevronLeft color="white" />
              </button>
            ]}
            rightItems={[
              <button
                className="flex w-12 h-12 bg-noir text-primary_text rounded-sm items-center justify-center"
                onClick={() => {
                  this.setState({ popUpMenuClicked: !this.state.popUpMenuClicked })
                }}
              >
                <PlusLg color="white" />
              </button>
            ]}
          />
          {this.state.popUpMenuClicked ? this.renderPopUpMenu() : null}
          <div className="grid grid-cols-2 gap-4 max-w-full bg-home w-screen absolute z-0">
            {this.renderLightCards()}
            {this.renderLightBar()}
          </div>
        </div>
      </View>
    )
  }
}

export default LightScreen
