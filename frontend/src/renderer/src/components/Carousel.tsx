import { Component, createRef, RefObject } from 'react'
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons'

type CarouselProps = {
  images: string[]
  titles: string[]
  subtitles: string[]
}

type CarouselState = {
  currentImage: number
}

class Carousel extends Component<CarouselProps, CarouselState> {
  reference: RefObject<HTMLDivElement> = createRef()

  constructor(props: CarouselProps) {
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
            <div key={index} className="carousel-item flex-shrink-0 w-1/4 max-w-xs">
              <img
                src={image}
                alt={this.props.titles[index]}
                className="w-full h-auto rounded-lg"
              />
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

export default Carousel
