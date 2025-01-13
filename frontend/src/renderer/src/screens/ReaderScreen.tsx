import { Component } from 'react'

import ComicsScreen from './ComicsScreen'

import { LightbulbFill, BookFill } from 'react-bootstrap-icons'

type ReaderScreenProps = {
  navigation: any
  route: any
}

class ReaderScreen extends Component<ReaderScreenProps> {
  state = {
    currentScreen: 'Comics'
  }

  constructor(props: ReaderScreenProps) {
    super(props)
  }

  renderComicsScreen() {
    return (
      <div>
        <ComicsScreen navigation={this.props.navigation} />
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.state.currentScreen === 'Comics' ? this.renderComicsScreen() : null}
        <div className="fixed w-full h-16 max-w-lg -translate-x-1/2 bg-noir border border-black rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
          <div className="grid h-full max-w-lg grid-cols-2 mx-auto">
            <button onClick={() => this.setState({ currentScreen: 'Comics' })}>
              <LightbulbFill color="white" className="h-6 w-6 mx-auto" />
            </button>
            <button onClick={() => this.setState({ currentScreen: 'Manga' })}>
              <BookFill color="white" className="h-6 w-6 mx-auto" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ReaderScreen
