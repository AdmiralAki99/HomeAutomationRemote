import React ,{useState, useEffect} from 'react';
import { useTheme } from '@mui/material/styles';
import { Button,IconButton,Box,Card,CardContent,Grid,CardMedia,Paper,Slide,MobileStepper,Typography} from '@mui/material';
import {ChevronRight,ChevronLeft,Pause,PlayArrow,SkipPrevious,SkipNext,VolumeMute,VolumeUp,Speaker,Apple,Lightbulb,LightMode,Camera,House,Person, Home,Menu} from '@mui/icons-material';
import { CardTitle } from '../@/components/ui/card';
import {Slider} from '../@/components/ui/slider';
import { Carousel } from '@material-tailwind/react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View} from 'react-native';
import RangeSlider from '../components/RangeSlider';
import LightSlider from '../components/LightSlider';
import Checkbox from '../components/LightCheckbox';
import LightCard from '../components/LightCard';

import { ScreenNavbar } from '../components/Navbar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenParamList } from '../App';

type LightProps = NativeStackScreenProps<ScreenParamList, 'Light'>;


function LightScreen({route,navigation}: LightProps){
  const [masterLightIntensity, setMasterLightIntensity] = useState(0);
  const [lightArray, setLightArray] = useState(0);

  const setLightIntensity = (intensity: number) => {
    setLightArray(intensity);
  }

  const handleMasterLightIntensity = (intensity:number) => {
    
    setLightArray(intensity);
    console.log(` Slider: ${document.getElementById("light-slider-1")?.getAttribute("value")}`)
    console.log(`Master Light Intensity = ${lightArray}`)
  }

    return (
      <View style={{ alignItems: "center" }}>
        <div className="bg-home w-full h-screen">
          <ScreenNavbar navigation={navigation} destination={'Home'}></ScreenNavbar>
          <div>
            <div>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 items-center bg-home justify-center gap-6 p-8">
                  <div className="grid grid-cols-1 items-center justify-center gap-4 p-6">
                    <div className="flex items-center mb-4 gap-6">
                      <input
                        id="light-section-1"
                        type="checkbox"
                        value={""}
                        name="light-selection"
                        className="w-4 h-4 text-white bg-noir border-white focus: ring-white"
                      ></input>
                      <a className="block max-w-lg w-80 h-40 p-6 bg-black border border-gray-800 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70">
                        <div className="grid grid-rows-3 grid-cols-2 gap-4">
                          <div className="row row-start-1 row-end-3 text-white">
                            Night Light
                          </div>
                          <div className="flex row-start-2 row-end-4 items-center justify-center h-full w-full object-fill pt-6 pl-6">
                            <LightSlider
                              min={0}
                              value={lightArray}
                              onChange={({ min }: { min: number }) =>handleMasterLightIntensity}
                            ></LightSlider>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="flex items-center mb-4 gap-6">
                      {/* <input
                      id="light-section-1"
                      type="checkbox"
                      value={""}
                      name="light-selection"
                      className="w-4 h-4 text-white bg-black border-white focus: ring-white"
                    ></input> */}
                      <Checkbox label="Subscribe to newsletter?" />
                      <a className="block max-w-lg w-80 h-40 p-6 bg-black border border-gray-800 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70">
                        <div className="grid grid-rows-3 grid-cols-2 gap-4">
                          <div className="row row-start-1 row-end-3 text-white">
                            {lightArray}
                          </div>
                          <div className="flex row-start-2 row-end-4 items-center justify-center h-full w-full object-fill pt-6 pl-6">
                            <LightSlider
                             id="light-slider-2"
                             min={0}
                             value={lightArray}
                             onChange={({ min }: { min: number }) => handleMasterLightIntensity}
                            ></LightSlider>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="flex items-center mb-4 gap-6">
                      <input
                        id="light-section-1"
                        type="checkbox"
                        value={""}
                        name="light-selection"
                        className="w-4 h-4 text-white bg-black border-white focus: ring-white"
                      ></input>
                      {/* Updated the Basic Template that is made into Light Card, need to delete after checking functionality*/}
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
                      <LightCard
                        min={0}
                        label="Computer"
                        onChange={({ min }: { min: number }) => handleMasterLightIntensity}
                      />
                    </div>
                    <div className="flex items-center mb-4 gap-6">
                      <input
                        id="light-section-1"
                        type="checkbox"
                        value={""}
                        name="light-selection"
                        className="w-4 h-4 text-white bg-black border-white focus: ring-white"
                      ></input>
                      <a className="block max-w-lg w-80 h-40 p-6 bg-black border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70">
                        <div className="grid grid-rows-3 grid-cols-2 gap-4">
                          <div className="row row-start-1 row-end-3 text-white" id="light-card-1">
                            Light #2
                          </div>
                          <div className="flex row-start-2 row-end-4 items-center justify-center h-full w-full object-fill pt-6 pl-6">
                            <LightSlider
                              id="light-slider-1"
                              min={0}
                              value={lightArray}
                              onChange={({ min }: { min: number }) => handleMasterLightIntensity}
                            ></LightSlider>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center h-full object-fill">
                    {/* <input
                    type="range"
                    className="accent-white w-full bg-gray-200 rounded-lg border-transparent -rotate-90 flex row-start-1 row-end-4"
                  ></input> */}
                    <RangeSlider
                      min={0}
                      onChange={({ min }: { min: number }) => handleMasterLightIntensity(min)}
                    ></RangeSlider>
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed w-full h-16 max-w-lg -translate-x-1/2 bg-black border border-black rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600 z-10">
              <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
                <button>
                  <LightMode sx={{ color: "white" }} />
                </button>
                <button>
                  <Camera sx={{ color: "white" }} />
                </button>
                <button>
                  <Home sx={{ color: "white" }} />
                </button>
                <button>
                  <Lightbulb sx={{ color: "white" }} />
                </button>
                <button>
                  <Person sx={{ color: "white" }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </View>
    );
  }

  export default LightScreen;