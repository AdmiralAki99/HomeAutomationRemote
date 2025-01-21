import { Component } from 'react'

import Navbar from '../components/Navbar'
import { ChevronLeft } from 'react-bootstrap-icons'
import { View } from 'react-native'

import Reader from '../components/Reader'

import serverAPI from '../ServerAPI'
import { get } from 'http'

type MangaReaderScreenProps = {
  navigation: any
  route: any
}

class MangaReaderScreen extends Component<MangaReaderScreenProps> {
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
    this.getPages()
  }

  async getPages() {
    await serverAPI
      .get(`/mangas/get/chapter/pages?chapter_id=${this.props.route.params.url}`)
      .then((response) => {
        this.setState({ pages: response.data, pagesLoaded: true })
      })
  }

  componentWillUnmount(): void {
    // console.log('Unmounting Comic Reader Screen')
  }

  componentDidUpdate(
    prevProps: Readonly<MangaReaderScreenProps>,
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

        {this.state.pagesLoaded ? <div className='no-scrollbar'><Reader pages={this.state.pages} decoded={true} /></div> : null}
      </div>
    )
  }
}

export default MangaReaderScreen
