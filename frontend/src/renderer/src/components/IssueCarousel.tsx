import { Component, createRef, RefObject } from 'react';
import { ChevronUp, ChevronDown } from 'react-bootstrap-icons';

type IssueCarouselProps = {
  titles: string[];
  links: string[];
  navigation: any;
  route: any;
  onIssueClick: any;
};

class IssueCarousel extends Component<IssueCarouselProps> {
  reference: RefObject<HTMLDivElement> = createRef();

  constructor(props: IssueCarouselProps) {
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
          className="grid grid-cols-1 gap-4 p-4 pl-16 overflow-y-scroll h-[95vh] no-scrollbar scroll-smooth"
          ref={this.reference}
        >
          {this.props.titles.map((result, index) => (
            <div key={index} className="grid-item text-sm font-semibold bg-white p-4 rounded-lg shadow-md" onClick={()=>{this.props.onIssueClick(this.props.links[index])}}>
              Chapter {result}
            </div>
          ))}
        </div>

        {/* Down arrow button */}
        <button
          onClick={this.scrollDown}
          className="absolute bottom-[35%] left-7 transform -translate-x-1/2 bg-gray-700 text-white p-2 rounded-full z-10"
          aria-label="Scroll Down"
        >
          <ChevronDown size={24} />
        </button>
      </div>
    );
  }
}

export default IssueCarousel;
