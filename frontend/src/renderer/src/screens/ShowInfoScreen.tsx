import { Component } from 'react'

import { View } from 'react-native'

import { ChevronLeft, Play } from 'react-bootstrap-icons'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import CircularProgressBar from '../components/CircularProgressBar'

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
    director: '',
    writer: '',
    recommendations: [],
    status: '',
    score: 0,
    releaseDate: '',
    runTime: '',
    genres: []
  }

  pushPlayerScreen() {
    this.props.navigation.push('MediaPlayerScreen', { url: this.state.link })
  }

  render() {
    return (
      <View>
        <div className="bg-home h-screen">
          <div className="bg-home h-screen flex flex-col">
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

            <div className="flex-grow overflow-y-auto p-4">
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
                    <p className="text-primary_text">Director(s): {this.state.director}</p>
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
                    <p className="text-primary_text">Writer(s): {this.state.writer}</p>
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
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-primary_text text-2xl font-bold p-2">Summary</h2>
                <p className="text-primary_text p-2 justify-around">{this.state.description}</p>
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
