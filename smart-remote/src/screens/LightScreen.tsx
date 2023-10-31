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

import { LightScreenNavBar } from '../components/Navbar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenParamList } from '../App';

type LightProps = NativeStackScreenProps<ScreenParamList, 'Light'>;


function LightScreen({route,navigation}: LightProps){
  const [masterLightIntensity, setMasterLightIntensity] = useState(0);
  const [lightArray, setLightArray] = useState([0,0,0,0]);
  const [selectedLights, setSelectedLights] = useState(false);

  const setLightIntensity = (intensity: number) => {
    setMasterLightIntensity(intensity);
  }

  const handleMasterLightIntensity = (intensity:number) => {
    setLightIntensity(intensity);
  }

    return (
      <View style={{ alignItems: "center" }}>
        <div className="bg-home w-full h-screen">
          <LightScreenNavBar
            navigation={navigation}
            destination={"Home"}
          ></LightScreenNavBar>
          <div>
            <div>
              <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 items-center bg-home justify-center gap-6 p-8">
                  <div className="grid grid-cols-1 items-center justify-center gap-4 p-6">
                    <div className="flex items-center mb-4 gap-6">
                      <LightCard
                        min={0}
                        value={masterLightIntensity}
                        label="Stand"
                        onChange={({ min }: { min: number }) => {}}
                      />
                    </div>
                    <div className="flex items-center mb-4 gap-6">
                      <LightCard
                        min={0}
                        value={masterLightIntensity}
                        label="Stand"
                        onChange={({ min }: { min: number }) => {}}
                      />
                    </div>
                    <div className="flex items-center mb-4 gap-6">
                      {/* Updated the Basic Template that is made into Light Card, need to delete after checking functionality*/}
                      <LightCard
                        min={0}
                        value={masterLightIntensity}
                        label="Computer"
                        onChange={({ min }: { min: number }) => {}}
                      />
                    </div>
                    <div className="flex items-center mb-4 gap-6">
                      <LightCard
                        min={0}
                        value={masterLightIntensity}
                        label="Light #2"
                        onChange={({ min }: { min: number }) => {}}
                      />
                    </div>
                  </div>
                  <div className="flex items-center h-full object-fill">
                    <RangeSlider
                      min={0}
                      onChange={({ min }: { min: number }) => {
                        handleMasterLightIntensity(min);
                        console.log(`Light Array = ${lightArray}`);
                      }}
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