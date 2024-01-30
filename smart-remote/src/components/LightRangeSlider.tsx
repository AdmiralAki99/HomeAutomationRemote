import { Light } from "@mui/icons-material";
import React from "react";


interface LightRangeSliderPropType{
    id: string,
    onChange: any
}
  
  class LightRangeSlider extends React.Component<LightRangeSliderPropType>{

    state:any

    constructor(props:any){
      super(props)
      this.state = {
        min: 0,
        max: 100,
        value: 0,
        id: props.id,
        onChange: props.onChange
      }

      this.renderRangeSlider = this.renderRangeSlider.bind(this)
    }

    renderRangeSlider(){
        return(
            <div className="container">
            <div>
                <input
                id={this.state.id}
                type="range"
                min={this.state.min}
                max={this.state.max}
                value={this.state.value}
                onChange={this.state.onChange}
                className="light-thumb light-thumb--zindex-3"
                />
            </div>
    
            <div className="light-slider">
                <div className="light-slider__track" />
                <div className="light-slider__range" />
            </div>
            </div>
        )
    }
  
    render(){
      return(
        <div>
          {this.renderRangeSlider()}
        </div>
      )
    }
  }

  export default LightRangeSlider;