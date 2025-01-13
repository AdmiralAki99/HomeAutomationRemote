import { Component } from 'react'

import Navbar from '../components/Navbar'
import { ChevronLeft } from 'react-bootstrap-icons'
import { View } from 'react-native'

import serverAPI from '../ServerAPI'

type ComicInfoScreenProps = {
  navigation: any
  route: any
}

class ComicInfoScreen extends Component<ComicInfoScreenProps> {
  state = {
    title: '',
    otherNames: '',
    genres: '',
    publisher: '',
    writer: '',
    artist: '',
    publicationDate: '',
    summary: '',
    issues: []
  }

  constructor(props: any) {
    super(props)
    this.getComicInfo = this.getComicInfo.bind(this)
    console.log(this.props.route.params)
  }

  componentDidMount(): void {
    if (!this.state.issues.length) {
      this.getComicInfo()
      console.log('Getting Issues')
    }
  }

  async getComicInfo() {
    // Fetch comic info from the server
    const response = await serverAPI.get(
      `/comics/search/series?query=${this.props.route.params.url}`
    )
    this.setState({
      title: response.data.title,
      otherNames: response.data.other_name,
      genres: response.data.genres,
      publisher: response.data.publisher,
      writer: response.data.writer,
      artist: response.data.artist,
      publicationDate: response.data.publication,
      summary: response.data.summary,
      issues: response.data.issues
    })
  }

  render() {
    return (
      <View>
        <div className="bg-home h-screen">
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
          <div className="grid grid-cols-2 p-4 gap-6">
            <div>
              <img
                src={this.props.route.params.img}
                alt={this.props.route.params.title}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-primary_text text-2xl font-bold">{this.state.title}</h1>

              <div className="mt-4">
                <p className="text-primary_text">{this.state.genres}</p>
                <p className="text-primary_text">{this.state.publisher}</p>
                <p className="text-primary_text">{this.state.writer}</p>
                <p className="text-primary_text">{this.state.artist}</p>
                <p className="text-primary_text">{this.state.publicationDate}</p>
              </div>

              <p className="text-primary_text mt-4 line-clamp-5">{this.state.summary}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 p-4 h-[calc(100vh-28rem)] overflow-y-auto no-scrollbar">
            {this.state.issues.map((result: any, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between w-40 h-40"
                onClick={() => {
                  this.props.navigation.push('ComicReader', { url: result.url })
                }}
              >
                {' '}
                {/* Added flex-col and justify-between */}
                <h3 className="text-md font-medium line-clamp-2">{result.title}</h3>
                <div>
                  <p className="text-gray-600">{result.date}</p> {/* Display the date */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </View>
    )
  }
}

export default ComicInfoScreen
