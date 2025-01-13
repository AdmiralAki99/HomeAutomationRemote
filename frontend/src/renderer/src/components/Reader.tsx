import { Component } from 'react'

type ReaderProps = {
  pages: any[]
}

class Reader extends Component<ReaderProps> {
  state = {
    currentPage: 0
  }

  constructor(props) {
    super(props)
    console.log(this.props.pages)
  }

  componentDidUpdate(
    prevProps: Readonly<ReaderProps>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    console.log('Reader Updated')
    console.log(this.state.currentPage)
    // console.log(this.props.pages)
  }

  renderPageNavigationButtons() {
    return (
      <div className="flex flex-col items-center fixed z-10 h-full w-full p-6">
        <button
          className="w-full h-full"
          onClick={() => {
            if(this.state.currentPage > 0){
              this.setState({ currentPage: this.state.currentPage - 1 })
            }
          }}
        >
        </button>
        <button
          className="h-full w-full"
          onClick={() => {
            if(this.state.currentPage < this.props.pages.length - 1){
              this.setState({ currentPage: this.state.currentPage + 1 })
            }
            
          }}
        >
        </button>
      </div>
    )
  }

  render() {
    return (
      <div className="bg-home h-full no-scrollbar items-center justify-center">
        {this.renderPageNavigationButtons()}
        <img src={this.props.pages[this.state.currentPage]} className="h-full max-h-full" />
        {/* <div className="h-full">Progress Slider</div> */}
      </div>
    )
  }
}

export default Reader
