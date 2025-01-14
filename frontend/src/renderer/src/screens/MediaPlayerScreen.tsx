import { Component } from 'react'
import { View } from 'react-native'

import { ChevronLeft, ArrowClockwise } from 'react-bootstrap-icons'

import serverAPI from '../ServerAPI'
import Navbar from '../components/Navbar'

import '../styles/MediaPlayerScreen.css'

type MediaPlayerScreenProps = {
  navigation: any
  route: any
}

class MediaPlayerScreen extends Component<MediaPlayerScreenProps> {
  state = {
    source: '',
    isFullScreen: false,
    servers: []
  }

  constructor(props: any) {
    super(props)
    this.handleFullScreen = this.handleFullScreen.bind(this)
  }

  componentDidMount(): void {
    this.getMovieSource()
  }

  handleFullScreen() {
    this.setState({ isFullScreen: !this.state.isFullScreen })
  }

  async getMovieSource() {
    await serverAPI
      .get(`${this.props.route.params.url}`)
      .then((response) => {
        this.setState({ source: response.data.default_url })
      })
  }

  render() {
    return (
      <View>
        <div className="bg-home h-screen relative no-scrollbar">
          <Navbar
            leftItems={[
              <button
                className="flex w-12 h-12 bg-noir text-primary_text items-center justify-center"
                onClick={() => this.props.navigation.pop()}
              >
                <ChevronLeft color="white" />
              </button>
            ]}
            rightItems={[
              <button
                className="flex w-12 h-12 bg-noir text-primary_text items-center justify-center"
                onClick={this.handleFullScreen}
              >
                <ArrowClockwise color="white" />
              </button>
            ]}
          />
          {/* Video player */}
          {this.state.source ? (
            <div
              className={`transition-all overflow-clip items-center justify-center bg-primary duration-300 ${this.state.isFullScreen ? 'landscape' : 'h-1/2'}`}
            >
              <iframe src={this.state.source} className="w-full h-full" />
            </div>
          ) : null}
        </div>
      </View>
    )
  }
}

export default MediaPlayerScreen
