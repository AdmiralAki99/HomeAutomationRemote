import { PropTypes } from "prop-types";
import { useState, useCallback, useEffect, useRef } from "react";
import classnames from "classnames";
import './RangeSlider.css'

//TODO: Need To Refactor This Component (IMPORTANT)

const RangeSlider = ({ min, onChange }) => {
  const [minVal, setVal] = useState(min);

  /* Creating References */
  const valRef = useRef(null);
  const rangeRef = useRef(null);

  /* Creating Percentage Values */
  const getPercent = useCallback(
    (value) => Math.round((value / 100) * 100),
    [min]
  );

  useEffect(() => {
    if (valRef.current) {
      const valuePercent = getPercent(minVal);
      if (rangeRef.current) {
        rangeRef.current.style.width = `${valuePercent}%`;
        rangeRef.current.style.borderRadius = `0px`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    // Call the onChange function whenever minVal changes
    onChange({ min: minVal });
  }, [minVal, onChange]);
  return (
    <div className="container">
      <div>
        <input
          type="range"
          min={min}
          max="100"
          value={minVal}
          ref={valRef}
          onChange={(event) => {
            const value = Math.min(+event.target.value, 100);
            setVal(value);
          }}
          className={classnames("thumb thumb--zindex-3")}
        />
      </div>

      <div className="slider">
        <div ref={rangeRef} className="slider__track rounded-2xl" />
        <div className="slider__range" ref={rangeRef}  />
      </div>
    </div>
  );
};

RangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RangeSlider;
