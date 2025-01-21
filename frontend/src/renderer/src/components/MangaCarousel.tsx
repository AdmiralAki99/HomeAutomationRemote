import { Component, createRef, RefObject } from 'react'
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons'

type MangaCarouselProps = {
  images: string[]
  titles: string[]
  subtitles: string[]
  links: string[]
  route: any
  navigation: any
  decode?: boolean
  description: string[]
  tags: any[]
  status: any[]
  id: any[]
  authors: any[]
}

type MangaCarouselState = {
  currentImage: number
}

class MangaCarousel extends Component<MangaCarouselProps, MangaCarouselState> {
  reference: RefObject<HTMLDivElement> = createRef()

  constructor(props: MangaCarouselProps) {
    super(props)
    this.state = {
      currentImage: 0
    }
    this.scrollLeft = this.scrollLeft.bind(this)
    this.scrollRight = this.scrollRight.bind(this)
  }

  scrollLeft() {
    if (this.reference.current) {
      const scrollAmount = this.reference.current.querySelector('.carousel-item')?.clientWidth || 0
      this.reference.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      })
      this.setState({
        currentImage: Math.max(this.state.currentImage - 1, 0)
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
        currentImage: Math.min(this.state.currentImage + 1, this.props.images.length - 1)
      })
    }
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
          className="carousel flex gap-4 p-2 overflow-x-scroll no-scrollbar scroll-smooth"
          ref={this.reference}
        >
          {this.props.images.map((image, index) => (
            <div
              key={index}
              className="carousel-item flex-shrink-0 w-1/4 max-w-xs"
              onClick={() => {
                this.props.navigation.push(this.props.route, {
                  url: "",
                  img: image,
                  description: this.props.description[index],
                  status: this.props.status[index],
                  year: this.props.subtitles[index],
                  title: this.props.titles[index],
                  tags: this.props.tags[index],
                  author: this.props.authors[index],
                  id: this.props.id[index]
                })
              }}
            >
              {this.props.decode ? (
                this.props.decode == true ? (
                  <img
                    src={`data:image/jpg;base64,${image}`}
                    alt={this.props.titles[index]}
                    className="w-full h-auto rounded-lg"
                  />
                ) : null
              ) : (
                <img
                  src={image}
                  alt={this.props.titles[index]}
                  className="w-full h-auto rounded-lg"
                />
              )}
              <div className="carousel-item-text mt-2">
                <h2 className="font-bold text-white text-sm truncate">
                  {this.props.titles[index]}
                </h2>

                <p className="text-xs font-semibold text-gray-200 w-full justify-end">
                  {this.props.subtitles[index]}
                </p>
              </div>
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

export default MangaCarousel
