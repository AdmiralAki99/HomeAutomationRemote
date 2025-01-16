import { Component } from 'react'

type ProgressBarProps = {
  currentPage: number
  length: number
}

class ProgressBar extends Component<ProgressBarProps> {
  state = {
    progress: 0,
    currentPage: 0,
    segmentWidth: 100 / this.props.length
  }

  constructor(props) {
    super(props)
  }

  componentDidMount(): void {}

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
    if (this.state.currentPage !== this.props.currentPage) {
      this.setState({
        currentPage: this.props.currentPage,
        progress: (this.props.currentPage * 100) / this.props.length - 1
      })
    }
  }

  renderSegment() {
    return Array.from({ length: this.props.length }, (_, index) => (
      <div
        key={index}
        className={`h-1 transition-all duration-700 ease-in-out ${
          index < this.state.currentPage ? 'bg-primary' : 'bg-gray-300'
        } ${index === 0 ? 'rounded-l-full' : ''} ${
          index === this.props.length? 'rounded-2xl' : ''
        } border border-gray-400`}
        style={{ width: `${this.state.segmentWidth}%` }}
      ></div>
    ))
  }

  render() {
    return (
      <div className="flex flex-row items-center justify-center">
        <div className="w-full h-1 bg-gray-300 rounded-full overflow-hidden flex">
          {/* Render the segments */}
          {this.renderSegment()}
        </div>
      </div>
    )
  }
}

export default ProgressBar
