import { Component } from 'react'
import { View } from 'react-native'

import { LightbulbFill, BookFill } from 'react-bootstrap-icons'

import MovieScreen from './MovieScreen'
import ShowScreen from './ShowScreen'

type MediaScreenProps = {
  navigation: any
  route: any
}

class MediaScreen extends Component<MediaScreenProps> {
  state = {
    currentScreen: 'Movies'
  }

  constructor(props: MediaScreenProps) {
    super(props)
  }

  render() {
    return (
      <View>
        <div>
            {this.state.currentScreen === 'Movies' ? <MovieScreen navigation={this.props.navigation} /> : null}
            {this.state.currentScreen === 'TV' ? <ShowScreen navigation={this.props.navigation} /> : null}
            {this.state.currentScreen === 'Anime' ? null : null}
          <div className="fixed w-full h-16 max-w-lg -translate-x-1/2 bg-noir border border-black rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
            <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
              <button onClick={() => this.setState({ currentScreen: 'Movies' })}>
                <LightbulbFill color="white" className="h-6 w-6 mx-auto" />
              </button>
              <button onClick={() => this.setState({ currentScreen: 'TV' })}>
                <BookFill color="white" className="h-6 w-6 mx-auto" />
              </button>
              <button onClick={() => this.setState({ currentScreen: 'Anime' })}>
                <BookFill color="white" className="h-6 w-6 mx-auto" />
              </button>
            </div>
          </div>
        </div>
      </View>
    )
  }
}

export default MediaScreen
