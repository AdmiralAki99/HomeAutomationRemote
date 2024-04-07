// import PropTypes from 'prop-types'
// import { useEffect, useState } from 'react';

// import LightSlider from './LightSlider';
// import Checkbox from './LightCheckbox';

// import { Modal, Box, Typography, Button, TextField } from "@mui/material";

// import axios from 'axios';
// import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// import ColorLensIcon from '@mui/icons-material/ColorLens';

// //TODO: Convert To React Component Style


// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 500,
//   height: 600,
//   bgcolor: '#1C1C1D',
//   boxShadow: 24,
//   p: 4,
// };

// const LightCard = ({value,label,isChecked,lightID,state}) => {

//     const [minVal, setVal] = useState(value);
//     const [labelName,setLabel] = useState(label);
//     const [manageModalOpen, setManageModalOpen] = useState(false);
//     const [lightDetails, setLightDetails] = useState({});
//     const [powerState, setPowerState] = useState(state);
//     const [isCheckedState, setIsCheckedState] = useState(isChecked);
//     const [lightSliderValue, setLightSliderValue] = useState(value);

//     // useEffect(() => {
//     //   setVal(value);
//     // });

//     const handleOpenManageModal = () => setManageModalOpen(true);
//     const handleCloseManageModal = () => setManageModalOpen(false);

//     const getLightInfo = () =>{
//       axios.post('/light/get/details',{
//         id: lightID
//       }).then((repsonse)=>{
//         setLightDetails(repsonse.data);
//       })
//     }

//     const updateLight = () =>{
//       if (powerState == true){
//         axios.post('/light/turn/off',{
//           id: lightID
//         })
//       }else{
//         axios.post('/light/turn/on',{
//           id: lightID
//         })
//       }
//     }

//     const handleCardClick = () =>{
//       handleOpenManageModal()
//       getLightInfo()
//     }

//     const handlePowerClick = () =>{
//       setPowerState(!powerState)
//       updateLight()
//     }

//     const handleSliderChange = (event) =>{
//       if(isCheckedState == true){
//         setLightSliderValue(event.target.value)
//       }
//     }

//     const handleCheckBoxCheck = (event) =>{
//       if(event.target.checked){
//         setIsCheckedState(true)
//       }else{
//         setIsCheckedState(false)
//       }
//     }


//     return (
//       <>
//         <Checkbox
//           label="Subscribe to newsletter?"
//           isChecked={isCheckedState}
//           id={"checkbox-1"}
//           onChange={handleCheckBoxCheck}
//         />
//         <a
//           className="block max-w-lg w-80 h-40 p-6 bg-black border border-gray-200 rounded-md shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70"
//         >
//           <div className="grid grid-rows-4 grid-cols-2 gap-4">
//             <div className="row row-start-1 row-end-3 text-white" onClick={handleCardClick}>{label}</div>
//             <div className="row row-start-3 row-end-4 text-white">
//               <div className="grid grid-rows-1 grid-cols-2 gap-10">
//                 <div>
//                   <button onClick={handlePowerClick} >
//                     {(powerState == true)? <PowerSettingsNewIcon
//                       sx={{ color: "white", fontSize: "large" }}
//                     /> : <PowerSettingsNewIcon
//                     sx={{ color: "gray", fontSize: "large" }}
//                   />}
//                   </button>
//                 </div>
//                 <div>
//                   <button>
//                     <ColorLensIcon
//                       sx={{ color: "white", fontSize: "large" }}
//                     />
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="flex row-start-2 row-end-5 items-center justify-center h-full w-full object-fill pt-6 pl-6">
//               <LightSlider
//                 min={0}
//                 value={value}
//                 onChange={handleSliderChange}
//               ></LightSlider>
//             </div>
//           </div>
//         </a>

//         {/* <Modal
//           open={manageModalOpen}
//           onClose={handleCloseManageModal}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//             <div className="flex justify-end items-end">
//               <Button onClick={handleCloseManageModal}>X</Button>
//             </div>
//             <div>
//               <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                 Light Name
//               </Typography>
//               <TextField
//                 id="outlined-basic"
//                 variant="outlined"
//                 defaultValue={lightDetails.name}
//               />
//               <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                 IP Address
//               </Typography>
//               <TextField
//                 disabled
//                 id="filled-disabled"
//                 variant="outlined"
//                 defaultValue={lightDetails.ip}
//                 sx={{ color: "white" }}
//               />
//               <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                 State
//               </Typography>
//               <TextField
//                 disabled
//                 id="filled-disabled"
//                 variant="outlined"
//                 defaultValue={lightDetails.state == "on" ? "On" : "Off"}
//                 sx={{ color: "white" }}
//               />
//             </div>
//           </Box>
//         </Modal> */}
//       </>
//     );

// };

// LightCard.propTypes = {
//     value: PropTypes.number.isRequired,
//     label: PropTypes.string.isRequired,
//     onChange: PropTypes.func.isRequired,
//     isChecked: PropTypes.bool.isRequired,
//     lightID: PropTypes.string.isRequired,
//     state: PropTypes.bool.isRequired
// }

// export default LightCard;