import { Component } from 'react'
import { View } from 'react-native'
import serverAPI from '../../src/ServerAPI'

import { ChevronLeft, Search } from 'react-bootstrap-icons'

import Navbar from '../components/Navbar'
import MangaSearchResult from '../components/MangaSearchResult'
import MangaCarousel from '../components/MangaCarousel'
import FloatingKeyboard from '../components/FloatingKeyboard'

type MangaScreenProps = {
  navigation: any
}

class MangaScreen extends Component<MangaScreenProps> {
  state = {
    searchPopupClicked: false,
    searchResults: [],
    topList: [],
    middleList: [],
    bottomList: [],
    searchQuery: ''  
  }

  constructor(props: MangaScreenProps) {
    super(props)
    this.state = {
      searchPopupClicked: false,
      searchResults: [],
      topList: [],
      middleList: [],
      bottomList: [],
      searchQuery: ''
    }

    this.handleSearch = this.handleSearch.bind(this)
    this.handleHomepage = this.handleHomepage.bind(this)
  }

  componentDidMount(): void {
    this.handleHomepage()
  }

  async handleHomepage(){
    await serverAPI.get('/mangas/get/homepage').then((response) => {
      this.setState({
        topList: response.data.top,
        middleList: response.data.middle,
        bottomList: response.data.bottom
      })
    })
  }

  async handleSearch(query: string) {
    const headers = {
      'Content-Type': 'application/json'
    }

    await serverAPI.get(`/mangas/search?query=${query}}`, {
      headers
    }).then((response) => this.setState({ searchResults: response.data }))
  }

  renderKeyboard() {
    return (
      <div>
        <FloatingKeyboard
          query={this.state.searchQuery}
          onSubmit={() => {
            this.handleSearch(this.state.searchQuery)
          }}
          onKeyPress={(button: string) => {
            if (button === '{backspace}') {
              this.setState({ searchQuery: this.state.searchQuery.slice(0, -1) })
            } else if (button === '{space}') {
              this.setState({ searchQuery: this.state.searchQuery + ' ' })
            } else {
              this.setState({ searchQuery: this.state.searchQuery + button })
            }
          }}
        />
      </div>
    )
  }

  renderSearchBar() {
    return (
      <div>
        <div className="fixed z-10 top-20 -right-14 w-full rounded-full">
          <input
            type="text"
            placeholder="Search..."
            className="h-12 w-[80%] rounded-3xl pl-3 text-lg"
            value={this.state.searchQuery}
          />
        </div>
        <div className="fixed z-10 top-20 right-2 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
          <button
            className="w-10 h-10 bg-primary rounded-full flex items-center justify-center"
            onClick={() => this.setState({ searchPopupClicked: !this.state.searchPopupClicked })}
          >
            <ChevronLeft color="white" />
          </button>
        </div>
        <div className="no-scrollbar fixed z-10 top-36 w-full h-[72%] overflow-y-auto flex flex-col items-center justify-start gap-4">
          {/* Static result card */}
          {/* <div className="bg-primary shadow-md rounded-lg p-4 w-80">
            <img
              src="placeholder-thumbnail.jpg"
              alt="Thumbnail"
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <h3 className="text-lg font-medium">Comic Title</h3>
            <p className="text-gray-600">This is a static result card.</p>
          </div> */}
          {this.state.searchResults.map((result: any, index) => (
            <MangaSearchResult
              key={index}
              header={result.title}
              subtitle={[
                `Year: ${result.year},  Status: ${result.status}`,
                `Author: ${result.relationships.author}`
              ]}
              thumbnail={result.cover_art}
              url=""
              description={result.description}
              navigation={this.props.navigation}
              route="MangaInfo"
              imageType="jpg"
              tags={result.tags}
              status={result.status}
              id={result.id}
            />
          ))}
        </div>
        {this.renderKeyboard()}
      </div>
    )
  }

  render() {
    return (
      <div className="h-screen bg-home">
        <View>
          {this.state.searchPopupClicked ? this.renderSearchBar() : null}
          <Navbar
            leftItems={[
              <button
                className="flex w-12 h-12 bg-noir text-primary_text items-center justify-center "
                onClick={() => this.props.navigation.navigate('Home')}
              >
                <ChevronLeft color="white" />
              </button>
            ]}
            rightItems={[
              <button
                className="flex w-12 h-12 bg-noir text-primary_text rounded-sm items-center justify-center"
                onClick={() =>
                  this.setState({ searchPopupClicked: !this.state.searchPopupClicked })
                }
              >
                <Search color="white" />
              </button>
            ]}
          />
          <div>
            <div className="w-full p-4">
              <MangaCarousel
                images = {this.state.topList.map((result:any)=> result.cover_art)}
                titles = {this.state.topList.map((result:any)=> result.title)}
                subtitles = {this.state.topList.map((result: any)=> `Year: ${result.year}`)}
                links = {this.state.topList.map((result: any)=> result.id)}
                description={this.state.topList.map((result: any)=> result.description)}
                tags = {this.state.topList.map((result: any)=> result.tags)}
                status = {this.state.topList.map((result: any)=> result.status)}
                id = {this.state.topList.map((result: any)=> result.id)}
                authors={this.state.topList.map((result: any)=> result.relationships.author)}
                navigation = {this.props.navigation}
                route = "MangaInfo"
                decode = {true}
              />
              <MangaCarousel
                images = {this.state.middleList.map((result:any)=> result.cover_art)}
                titles = {this.state.middleList.map((result:any)=> result.title)}
                subtitles = {this.state.middleList.map((result: any)=> `Year: ${result.year}`)}
                links = {this.state.middleList.map((result: any)=> result.id)}
                description={this.state.middleList.map((result: any)=> result.description)}
                tags = {this.state.middleList.map((result: any)=> result.tags)}
                status = {this.state.middleList.map((result: any)=> result.status)}
                id = {this.state.middleList.map((result: any)=> result.id)}
                authors={this.state.middleList.map((result: any)=> result.relationships.author)}
                navigation = {this.props.navigation}
                route = "MangaInfo"
                decode = {true}
              />
              <MangaCarousel
                images = {this.state.bottomList.map((result:any)=> result.cover_art)}
                titles = {this.state.bottomList.map((result:any)=> result.title)}
                subtitles = {this.state.bottomList.map((result: any)=> `Year: ${result.year}`)}
                links = {this.state.bottomList.map((result: any)=> result.id)}
                description={this.state.bottomList.map((result: any)=> result.description)}
                tags = {this.state.bottomList.map((result: any)=> result.tags)}
                status = {this.state.bottomList.map((result: any)=> result.status)}
                id = {this.state.bottomList.map((result: any)=> result.id)}
                authors={this.state.bottomList.map((result: any)=> result.relationships.author)}
                navigation = {this.props.navigation}
                route = "MangaInfo"
                decode = {true}
              />
            </div>
          </div>
        </View>
      </div>
    )
  }
}

export default MangaScreen
