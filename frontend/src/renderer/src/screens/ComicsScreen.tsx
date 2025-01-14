import { Component } from 'react'
import { View } from 'react-native'
import serverAPI from '../../src/ServerAPI'

import { ChevronLeft, Search } from 'react-bootstrap-icons'
import '../styles/ComicScreen.css'

import Navbar from '../components/Navbar'
import ComicSearchResult from '../components/ComicSearchResult'
import Carousel from '../components/Carousel'

type ComicsScreenProps = {
  navigation: any
}

class ComicsScreen extends Component<ComicsScreenProps> {
  state = {
    searchPopupClicked: false,
    searchResults: [],
    newComics: [],
    topToday: [],
    topThisWeek: [],
    topThisMonth: [],
    popular: []
  }

  constructor(props: ComicsScreenProps) {
    super(props)
    this.state = {
      searchPopupClicked: false,
      searchResults: [],
      newComics: [],
      topToday: [],
      topThisWeek: [],
      topThisMonth: [],
      popular: []
    }

    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount(): void {
    this.handleHomePage()
  }

  async handleSearch(event) {
    const headers = {
      'Content-Type': 'application/json'
    }

    if (event.key === 'Enter') {
      const response = await serverAPI.get(`/comics/search?query=${event.target.value}}`, {
        headers
      })
      console.log()
      this.setState({ searchResults: response.data })
    }
  }

  async handleHomePage() {
    await serverAPI.get('/comics/get/homepage').then((response) => {
      this.setState({
        newComics: response.data.newest,
        topToday: response.data.top_day,
        topThisWeek: response.data.top_week,
        topThisMonth: response.data.top_month,
        popular: response.data.mostview
      })
    })
  }

  renderSearchBar() {
    return (
      <div>
        <div className="fixed z-10 top-20 -right-14 w-full rounded-full">
          <input
            type="text"
            placeholder="Search..."
            className="h-12 w-[80%] rounded-3xl pl-3 text-lg"
            onKeyDown={this.handleSearch}
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
            <ComicSearchResult
              key={index}
              title={result.title}
              url={result.url}
              thumbnail={result.img}
              publication={result.publication}
              status={result.status}
              summary={result.summary}
              navigation={this.props.navigation}
            />
          ))}
        </div>
      </div>
    )
  }

  render() {
    return (
      <View>
        <div className="h-screen bg-home">
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
          <div className="grid grid-cols-1 gap-1 p-2 max-w-full bg-home w-screen absolute z-0">
            <div className="bg-noir w-full rounded-2xl">
              <p className="text-2xl text-white pl-2"> New Comics</p>
              <Carousel
                images={this.state.newComics.map((item: any) => item.img)}
                titles={this.state.newComics.map((item: any) => item.title)}
                subtitles={this.state.newComics.map((item: any) => item.genres.join(', '))}
              />
            </div>
            <div className="bg-noir w-full rounded-2xl pl-2">
              <p className="text-2xl text-white"> Top Today</p>
              <Carousel
                images={this.state.topToday.map((item: any) => item.img)}
                titles={this.state.topToday.map((item: any) => item.title)}
                subtitles={this.state.topToday.map((item: any) => item.genres.join(', '))}
              />
            </div>
            <div className="bg-noir w-full rounded-2xl pl-2">
              <p className="text-2xl text-white"> Top This Week</p>
              <Carousel
                images={this.state.topThisWeek.map((item: any) => item.img)}
                titles={this.state.topThisWeek.map((item: any) => item.title)}
                subtitles={this.state.topThisWeek.map((item: any) => item.genres.join(', '))}
              />
            </div>
          </div>
        </div>
      </View>
    )
  }
}

export default ComicsScreen
