
const RangeSlider = () => {
    return (
      <div className="container">
        <div>
          <input
            type="range"
            min="0"
            max="100"
            className="range-slider"
          ></input>
        </div>

        <div className="slider">
            <div className="slider__track" />
            <div className="slider__range"/>
        </div>
      </div>
    );
};

export default RangeSlider;