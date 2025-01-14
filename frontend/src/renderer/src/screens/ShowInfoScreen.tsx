import { Component } from 'react'
import { View } from 'react-native'

import '../ServerAPI'

import { ChevronLeft, Play } from 'react-bootstrap-icons'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import SeasonCarousel from '../components/SeasonCarousel'
import CircularProgressBar from '../components/CircularProgressBar'
import serverAPI from '../ServerAPI'

type ShowInfoScreenProps = {
  navigation: any
  route: any
}

class ShowInfoScreen extends Component<ShowInfoScreenProps> {
  state = {
    img: '',
    title: '',
    description: '',
    link: '',
    recommendations: [],
    seasons: [],
    seasonInfo: [],
    status: '',
    score: 0,
    releaseDate: '',
    runTime: '',
    seasonSelected: 1,
    genres: []
  }

  constructor(props: ShowInfoScreenProps) {
    super(props)
    this.handleShowInfo = this.handleShowInfo.bind(this)
    this.pushPlayerScreen = this.pushPlayerScreen.bind(this)
  }

  componentDidMount(): void {
    this.handleShowInfo()
    this.handleGetSeason()
  }

  async handleShowInfo() {
    await serverAPI.get(`/tv/get/info?query=${this.props.route.params.url}`).then((response) => {
      this.setState({
        title: response.data.title,
        description: response.data.description,
        score: response.data.score,
        releaseDate: response.data.release_date,
        genres: response.data.genres,
        seasons: response.data.seasons,
        recommendations: response.data.recommendations,
        status: response.data.status
      })
    })
  }

  async handleGetSeason() {
    await serverAPI
      .get(
        `/tv/get/season?link=${this.props.route.params.url}&season_number=${this.state.seasonSelected}`
      )
      .then((response) => {
        this.setState({
          seasonInfo: response.data
        })
      })
  }

  pushPlayerScreen() {
    this.props.navigation.push('MediaPlayerScreen', { url: `/tv/get/episode/source?link=${this.props.route.params.url}&season_number=${this.state.seasonSelected}&episode_number=1` })
  }

  render() {
    return (
      <View>
        <div className="bg-home h-screen">
          <div className="bg-home h-screen flex flex-col no-scrollbar">
            <Navbar
              leftItems={[
                <button
                  className="flex w-12 h-12 bg-noir text-primary_text items-center justify-center"
                  onClick={() => this.props.navigation.pop()}
                >
                  <ChevronLeft color="white" />
                </button>
              ]}
              rightItems={[]}
            />

            <div className="flex-grow p-4">
              <div className="grid grid-cols-2 gap-6">
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
                    <div className="text-primary_text pt-2 pb-2">
                      Genres:{' '}
                      <div className="flex flex-wrap gap-2">
                        {this.state.genres.map((genre: any, index: number) => (
                          <div
                            key={index}
                            className="bg-primary text-white py-1 px-2 rounded-full text-sm"
                          >
                            {genre}
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-primary_text">Score: {this.state.score}/10</p>
                    <p className="text-primary_text">Release Date: {this.state.releaseDate}</p>
                    <p className="text-primary_text">Run Time: {this.state.runTime}</p>
                    <div className="flex flex-row items-center gap-14">
                      <button
                        className="bg-primary text-white p-4 rounded-full mt-4 flex items-center"
                        onClick={() => this.pushPlayerScreen()}
                      >
                        <Play size={24} color="white" className="mr-2" />
                        Play
                      </button>
                      <CircularProgressBar
                        size={80}
                        progress={this.state.score * 10}
                        text={`${this.state.score}`}
                      />
                    </div>
                    {/* <h2 className="text-primary_text text-2xl font-bold p-2">Summary</h2> */}
                    <p className="text-primary_text p-2 justify-around line-clamp-4">
                      {this.state.description}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-row items-center justify-between bg-noir rounded-lg">
                  <h2 className="text-primary_text text-2xl font-bold p-2">Seasons</h2>
                  <select className='bg-noir text-primary_text p-2' onChange={(e) => this.setState({ seasonSelected: e.target.value }, this.handleGetSeason)}>
                    {this.state.seasons.map((season: any, index: number) => (
                      <option key={index} value={index + 1} className='bg-noir text-primary_text'>
                        {season}
                      </option>
                    ))}
                  </select>
                </div>
                <SeasonCarousel episodes={this.state.seasonInfo} navigation={this.props.navigation} link={this.props.route.params.url} seasonNumber={this.state.seasonSelected} />
              </div>
              <div>
                <h2 className="text-primary_text text-2xl font-bold p-2">Recommendations</h2>
                <Carousel
                  images={this.state.recommendations.map((item: any) => item.poster_img)}
                  titles={this.state.recommendations.map((item: any) => item.title)}
                  subtitles={this.state.recommendations.map(
                    (item: any) => item.media_type + ' ' + item.date
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </View>
    )
  }
}

export default ShowInfoScreen
