import { PropTypes } from "prop-types";
import { useState, useCallback, useEffect,useRef } from "react";
import classnames from "classnames";
import './rangeSlider.css'

const RangeSlider = ({min,onChange}) => {
    const [minVal,setVal] = useState(min);

    {/*Creating References*/}
    const valRef = useRef(null);
    const rangeRef = useRef(null);

    {/*Creating Percentage Values*/}
    const getPercent = useCallback(
        (value) => Math.round((value/100)*100),[min]
    );

    useEffect(()=>{
        if(valRef.current){
            const valuePercent = getPercent(minVal);
            if(rangeRef.current){
                rangeRef.current.style.width = `100%`;
            }
        }
    },[minVal,getPercent]);

    useEffect(()=>{
        onChange({min:minVal});
    },[minVal,onChange]);

    RangeSlider.propTypes = {
        min: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired
    };

    return (
      <div className="container">
        <div>
          <input
            type="range"
            min={min}
            max="100"
            value={minVal}
            ref={valRef}
            onChange={(event)=>{
                const value = Math.min(+event.target.value,100);
                setVal(value);
                event.target.value = value;
            }}

            className={
                classnames("thumb thumb--zindex-4")
            }
          />
        </div>

        <div className="slider">
            <div ref={rangeRef} className="slider__track" />
            <div className="slider__range"/>
            <div className="slider__left-value">{minVal}</div>
        </div>
      </div>
    );
};

export default RangeSlider;