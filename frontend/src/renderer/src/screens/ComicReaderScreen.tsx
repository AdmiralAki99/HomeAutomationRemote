import { Component } from 'react'

import Navbar from '../components/Navbar'
import { ChevronLeft } from 'react-bootstrap-icons'
import { View } from 'react-native'

import Reader from '../components/Reader'

import serverAPI from '../ServerAPI'

type ComicReaderScreenProps = {
  navigation: any
  route: any
}

class ComicReaderScreen extends Component<ComicReaderScreenProps> {
  state = {
    pages: [],
    pagesLoaded: false
  }

  constructor(props: any) {
    super(props)
    this.getPages = this.getPages.bind(this)
  }

  async componentDidMount() {
    console.log('Getting Pages')
    await serverAPI
      .get(`/comics/search/issue?query=${this.props.route.params.url}`)
      .then((response) => {
        this.setState({ pages: response.data,pagesLoaded: true })
    })
  }

  async getPages() {
    await serverAPI
      .get(`/comics/search/issue?query=${this.props.route.params.url}`)
      .then((response) => {
        this.setState({ pages: response.data, pagesLoaded: true })
      })
  }

  componentWillUnmount(): void {
    // console.log('Unmounting Comic Reader Screen')
  }

  componentDidUpdate(
    prevProps: Readonly<ComicReaderScreenProps>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    // console.log('Comic Reader Screen Updated')
  }

  render() {
    return (
      <div>
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

        {this.state.pagesLoaded ? <div className='no-scrollbar'><Reader pages={this.state.pages} /></div> : null}
      </div>
    )
  }
}

export default ComicReaderScreen
