import { useState } from "react";
import PropTypes from 'prop-types'
import './LightCheckbox.css'

const Checkbox = ({ label, isChecked,...props}) => {
    const defaultChecked = isChecked ? isChecked : false;
    const [checked, setChecked] = useState(defaultChecked);

    
    return (
      <div className="checkbox-container">
        <input type="checkbox" className={checked ? "Checked" : "Unchecked"} checked={checked} {...props} onClick={()=>
          {
            setChecked(!checked)
          }
        }></input>
      </div>
    );
  };

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
}


  export default Checkbox;