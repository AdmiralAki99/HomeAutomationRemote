import { Component } from 'react'
import serverAPI from '../../src/ServerAPI'
import { View } from 'react-native'

import { ChevronLeft, Search } from 'react-bootstrap-icons'

import Navbar from '../components/Navbar'
import SearchResult from '../components/SearchResult'
import GalleryGrid from '../components/GalleryGrid'
import FloatingKeyboard from '../components/FloatingKeyboard'

type ShowScreenProps = {
  navigation: any
}

class ShowScreen extends Component<ShowScreenProps> {
  state = {
    searchPopupClicked: false,
    searchResults: [],
    homepage: [],
    searchQuery: ''
  }
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleHomePage = this.handleHomePage.bind(this)
  }

  componentDidMount(): void {
    this.handleHomePage()
  }

  async handleHomePage() {
    await serverAPI.get('/tv/get/homepage').then((response) => {
      this.setState({
        homepage: response.data
      })
    })
  }

  async handleSearch(query: string) {
    const headers = {
      'Content-Type': 'application/json'
    }

    await serverAPI.get(`/tv/search/?query=${query}`, { headers }).then((response) =>this.setState({ searchResults: response.data }))
    
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
            <SearchResult
              key={index}
              header={result.title}
              subtitle={[result.date]}
              thumbnail={result.poster_img}
              url={result.link}
              navigation={this.props.navigation}
              description=""
              route="ShowInfo"
            />
          ))}
        </div>
        {this.renderKeyboard()}
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
                onClick={() => this.props.navigation.pop()}
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
          <div className="grid grid-cols-2 gap-4 max-w-full bg-home w-screen absolute z-0">
            <div className=" bg-home w-screen absolute z-0 overflow-hidden">
              <GalleryGrid
                images={this.state.homepage.map((result: any) => result.poster_img)}
                links={this.state.homepage.map((result: any) => result.link)}
                navigation={this.props.navigation}
                route={'ShowInfo'}
              />
            </div>
          </div>
        </div>
      </View>
    )
  }
}

export default ShowScreen
