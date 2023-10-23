import PropTypes from 'prop-types'
import { useState } from 'react';
import LightSlider from './LightSlider';

const LightCard = ({min,label,onChange}) => {

    const [minVal, setVal] = useState(min);
    const [labelName,setLabel] = useState(label);


    return (
      <a className="block max-w-lg w-80 h-40 p-6 bg-black border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70">
        <div className="grid grid-rows-3 grid-cols-2 gap-4">
          <div className="row row-start-1 row-end-3 text-white">{label}</div>
          <div className="flex row-start-2 row-end-4 items-center justify-center h-full w-full object-fill pt-6 pl-6">
            <LightSlider
              min={0}
              onChange={({ min }) =>
                console.log(`val = ${min}`)
              }
            ></LightSlider>
          </div>
        </div>
      </a>
    );

};

LightCard.propTypes = {
    min: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default LightCard;

{/* <a className="block max-w-lg w-80 h-40 p-6 bg-black border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70">
<div className="grid grid-rows-3 grid-cols-2 gap-4">
  <div className="row row-start-1 row-end-3 text-white">
    Lamp
  </div>
  <div className="flex row-start-2 row-end-4 items-center justify-center h-full w-full object-fill pt-6 pl-6">
    <LightSlider
      min={0}
      onChange={({ min }: { min: number }) =>
        console.log(`val = ${min}`)
      }
    ></LightSlider>
  </div>
</div>
</a> */}