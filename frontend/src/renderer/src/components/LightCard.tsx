import { Component } from 'react'
import { Power } from 'react-bootstrap-icons'

import '../styles/LightCard.css'

class LightCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lightLevel: 0
    }
  }

  componentDidMount(): void {}

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {}

  componentWillUnmount(): void {}

  renderInteractionButtons() {
    return (
      <button className="bg-secondary rounded-lg">
        <Power color="white" />
      </button>
    )
  }
  // TODO: Finish Implementing the LightCard Component
  render() {
    return (
      <div>
        <div className="grid grid-cols-2 bg-home rounded-lg shadow-lg border-2 border-primary_text">
          <div className=" p-6 grid grid-rows-2 items-center justify-center">
            <div className="text-primary_text">Light Name</div>
            {this.renderInteractionButtons()}
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            <input type="range" className="light-slider" />
          </div>
        </div>
      </div>
    )
  }
}

export default LightCard
