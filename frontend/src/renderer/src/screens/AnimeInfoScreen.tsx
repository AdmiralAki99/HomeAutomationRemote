import { Component } from 'react'
import { View } from 'react-native'

import '../ServerAPI'

import { ChevronLeft, Play } from 'react-bootstrap-icons'
import Navbar from '../components/Navbar'
import EpisodeCarousel from '../components/EpisodeCarousel'
import serverAPI from '../ServerAPI'

type AnimeInfoScreenProps = {
  navigation: any
  route: any
}

class AnimeInfoScreen extends Component<AnimeInfoScreenProps> {
  state = {
    title: '',
    episodes: [],
    description: '',
    type: '',
    duration: '',
    date: '',
    episodesCount: '',
    status: '',
    studio: '',
    producers: '',
    poster: ''
  }

  constructor(props: AnimeInfoScreenProps) {
    super(props)
    this.handleShowInfo = this.handleShowInfo.bind(this)
    this.pushPlayerScreen = this.pushPlayerScreen.bind(this)
  }

  componentDidMount(): void {
    this.handleShowInfo()
    console.log(this.props.route.params.url)
  }

  async handleShowInfo() {
    await serverAPI.get(`/animes/get/info?link=${this.props.route.params.url}`).then((response) => {
      this.setState({
        title: response.data.title,
        episodes: response.data.episodes,
        description: response.data.description,
        type: response.data.type,
        duration: response.data.duration,
        date: response.data.date,
        episodesCount: response.data.episodes_count,
        status: response.data.status,
        studio: response.data.studio,
        producers: response.data.producers,
        poster: response.data.poster
      })
    })
  }

  pushPlayerScreen() {
    this.props.navigation.push('MediaPlayerScreen',{url: `/animes/get/episode/link?link=${this.props.route.params.url}&ep=`})
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
                    src={this.state.poster}
                    alt={this.state.title}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-primary_text text-2xl font-bold">{this.state.title}</h1>

                  <div className="mt-4">
                    <p className="text-primary_text">{this.state.type}</p>
                    <p className="text-primary_text">{this.state.date}</p>
                    <p className="text-primary_text">{this.state.producers}</p>
                    <p className="text-primary_text">{this.state.studio}</p>
                    <p className="text-primary_text">Run Time: {this.state.duration}</p>
                    <div className="flex flex-row items-center gap-14">
                      <button
                        className="bg-primary text-white p-4 rounded-full mt-4 flex items-center"
                        onClick={() => this.pushPlayerScreen()}
                      >
                        <Play size={24} color="white" className="mr-2" />
                        Play
                      </button>
                    </div>
                    <p className="text-primary_text p-2 justify-around line-clamp-5">
                      {this.state.description}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-primary_text text-2xl font-bold p-2">Episodes</h2>
                <EpisodeCarousel episodes={this.state.episodes} navigation={this.props.navigation} link={this.props.route.params.url}/>
              </div>
              {/* <div>
                <h2 className="text-primary_text text-2xl font-bold p-2">Recommendations</h2>
                <Carousel
                  images={this.state.recommendations.map((item: any) => item.poster_img)}
                  titles={this.state.recommendations.map((item: any) => item.title)}
                  subtitles={this.state.recommendations.map(
                    (item: any) => item.media_type + ' ' + item.date
                  )}
                />
              </div> */}
            </div>
          </div>
        </div>
      </View>
    )
  }
}

export default AnimeInfoScreen
