import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';

import LightSlider from './LightSlider';
import Checkbox from './LightCheckbox';

import { Modal, Box, Typography, Button, TextField } from "@mui/material";

import axios from 'axios';

//TODO: Convert To React Component Style


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 600,
  bgcolor: '#1C1C1D',
  boxShadow: 24,
  p: 4,
};

const LightCard = ({min,value,label,onChange,isChecked,onCheck,lightID}) => {

    const [minVal, setVal] = useState(value);
    const [labelName,setLabel] = useState(label);
    const [manageModalOpen, setManageModalOpen] = useState(false);
    const [lightDetails, setLightDetails] = useState({});

    // useEffect(() => {
    //   setVal(value);
    // });

    const handleOpenManageModal = () => setManageModalOpen(true);
    const handleCloseManageModal = () => setManageModalOpen(false);

   

    return (
      <>
        <Checkbox
          label="Subscribe to newsletter?"
          isChecked={isChecked}
          id={"checkbox-1"}
          onChange={onCheck}
        />
        <a className="block max-w-lg w-80 h-40 p-6 bg-black border border-gray-200 rounded-md shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70">
          <div className="grid grid-rows-3 grid-cols-2 gap-4">
            <div className="row row-start-1 row-end-3 text-white">{label}</div>
            <div className="flex row-start-2 row-end-4 items-center justify-center h-full w-full object-fill pt-6 pl-6">
              <LightSlider
                min={0}
                value={value}
                onChange={({ min }) => console.log(`val = ${min}`)}
              ></LightSlider>
            </div>
          </div>
        </a>

        <Modal
          open={manageModalOpen}
          onClose={handleCloseManageModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex justify-end items-end">
              <Button onClick={handleCloseManageModal}>Close</Button>
              <Button onClick={handleScanList}>Scan</Button>
              <Button>Connect</Button>
            </div>
            <div>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Light Name
              </Typography>
              <TextField id="outlined-basic" variant="outlined" placeholder={lightDetails.name} />
            </div>
          </Box>
        </Modal>
      </>
    );

};

LightCard.propTypes = {
    min: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    isChecked: PropTypes.bool.isRequired,
    onCheck: PropTypes.func.isRequired,
    lightID: PropTypes.string.isRequired,
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