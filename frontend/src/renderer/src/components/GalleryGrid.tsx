import { Component, createRef, RefObject } from 'react';
import { ChevronUp, ChevronDown } from 'react-bootstrap-icons';

type GalleryGridProps = {
  images: string[];
  links: string[];
};

class GalleryGrid extends Component<GalleryGridProps> {
  reference: RefObject<HTMLDivElement> = createRef();

  constructor(props: GalleryGridProps) {
    super(props);
    this.scrollUp = this.scrollUp.bind(this);
    this.scrollDown = this.scrollDown.bind(this);
  }

  scrollUp() {
    if (this.reference.current) {
      this.reference.current.scrollBy({
        top: -200, // Scrolls up by 200px
        behavior: 'smooth',
      });
    }
  }

  scrollDown() {
    if (this.reference.current) {
      this.reference.current.scrollBy({
        top: 200, // Scrolls down by 200px
        behavior: 'smooth',
      });
    }
  }

  render() {
    return (
      <div className="relative w-full max-h-screen overflow-hidden">
        {/* Up arrow button */}
        <button
          onClick={this.scrollUp}
          className="absolute top-20 left-7 transform -translate-x-1/2 bg-gray-700 text-white p-2 rounded-full z-10"
          aria-label="Scroll Up"
        >
          <ChevronUp size={24} />
        </button>

        {/* Scrollable grid container */}
        <div
          className="grid grid-cols-4 gap-4 p-4 overflow-y-scroll h-[95vh] no-scrollbar scroll-smooth"
          ref={this.reference}
        >
          {this.props.images.map((result, index) => (
            <div key={index} className="grid-item bg-white p-4 rounded-lg shadow-md">
              <img
                src={result}
                alt={`Image ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
            </div>
          ))}
        </div>

        {/* Down arrow button */}
        <button
          onClick={this.scrollDown}
          className="absolute bottom-20 left-7 transform -translate-x-1/2 bg-gray-700 text-white p-2 rounded-full z-10"
          aria-label="Scroll Down"
        >
          <ChevronDown size={24} />
        </button>
      </div>
    );
  }
}

export default GalleryGrid;
