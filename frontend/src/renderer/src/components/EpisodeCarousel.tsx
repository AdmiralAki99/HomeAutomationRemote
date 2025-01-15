import { Component, createRef, RefObject } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'react-bootstrap-icons'

type CarouselProps = {
  episodes: any[]
  navigation: any
  link: string
}

type CarouselState = {
  currentColumn: number
  episodeSelected: number
}

class EpisodeCarousel extends Component<CarouselProps, CarouselState> {
  reference: RefObject<HTMLDivElement> = createRef()

  constructor(props: CarouselProps) {
    super(props)
    this.state = {
      currentColumn: 0,
      episodeSelected: 1
    }
    this.scrollLeft = this.scrollLeft.bind(this)
    this.scrollRight = this.scrollRight.bind(this)

    console.log(this.props.episodes)
  }

  scrollLeft() {
    if (this.reference.current) {
      const scrollAmount = this.reference.current.querySelector('.carousel-item')?.clientWidth || 0
      this.reference.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      })
      this.setState({
        currentColumn: Math.max(this.state.currentColumn - 1, 0)
      })
    }
  }

  scrollRight() {
    if (this.reference.current) {
      const scrollAmount = this.reference.current.querySelector('.carousel-item')?.clientWidth || 0
      this.reference.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      })
      this.setState({
        currentColumn: Math.min(this.state.currentColumn + 1, this.props.episodes.length - 1)
      })
    }
  }

  pushPlayerScreen(episode: number) {
    console.log("Episode Selected:", episode)
    this.props.navigation.push('MediaPlayerScreen', {
      url: `/animes/get/episode/link?link=${this.props.episodes[episode - 1].link}`
    })
  }

  render() {
    return (
      <div className="carousel-container relative w-full overflow-hidden">
        {/* Left arrow */}
        <button
          onClick={this.scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full z-10"
          aria-label="Scroll Left"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Carousel items */}
        <div
          className="carousel flex gap-4 p-1 overflow-x-scroll no-scrollbar scroll-smooth"
          ref={this.reference}
        >
          {this.props.episodes
            .reduce((acc, episode, index) => {
              const columnIndex = Math.floor(index / 3) // Calculate column index
              if (!acc[columnIndex]) {
                acc[columnIndex] = [] // Create a new column array if it doesn't exist
              }
              acc[columnIndex].push(episode) // Add the episode to the current column
              return acc
            }, [])
            .map((column, columnIndex) => (
              <div key={columnIndex} className="column flex flex-col gap-2">
                {column.map((episode, index) => (
                  <button
                    onClick={() => {
                      this.pushPlayerScreen(episode.number)
                      // console.log('Episode Selected:', episode.number)
                    }}
                  >
                    <div
                      key={index}
                      className="carousel-item w-48 max-w-lg p-1 bg-noir border-2 border-gray-700 rounded-lg"
                    >
                      {' '}
                      {/* Adjust width as needed */}
                      <div className="carousel-item-text">
                        <h2 className="font-bold text-white text-sm truncate">
                          Episode {episode.number}
                        </h2>
                        <p className="text-xs font-semibold text-gray-200 w-full justify-end line-clamp-1">
                          {episode.title}
                        </p>
                        {/* <p className="text-xs font-semibold text-gray-200 w-full justify-end">
                        Third Row Text
                      </p> */}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={this.scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full z-10"
          aria-label="Scroll Right"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    )
  }
}

export default EpisodeCarousel
