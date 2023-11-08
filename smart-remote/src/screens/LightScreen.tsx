import React ,{useState, useEffect} from 'react';
import { useTheme } from '@mui/material/styles';
import { Button,IconButton,Box,Card,CardContent,Grid,CardMedia,Paper,Slide,MobileStepper,Typography} from '@mui/material';
import {Lightbulb,LightMode,Camera,House,Person, Home,Menu} from '@mui/icons-material';
import {View} from 'react-native';

import RangeSlider from '../components/RangeSlider';
import LightCard from '../components/LightCard';

import { LightScreenNavBar } from '../components/Navbar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenParamList } from '../App';

type LightProps = NativeStackScreenProps<ScreenParamList, 'Light'>;


function LightScreen({route,navigation}: LightProps){
  const [masterLightIntensity, setMasterLightIntensity] = useState(0);
  const [lightArray, setLightArray] = useState([0,0,0,0]);
  const [selectedLights, setSelectedLights] = useState(false);
  const [lights,setLights] = useState<Record<string,any>>([])

  const setLightIntensity = (intensity: number) => {
    setMasterLightIntensity(intensity);
  }

  const handleLightsList = async () => {
    await fetch("/light/all", { method: "GET" })
      .then((res) => res.json())
      .then((val) => {
        setLights(val);
      });
  };

  const handleMasterLightIntensity = (intensity:number) => {
    setLightIntensity(intensity);
  }

  useEffect(()=> {
    handleLightsList();
  },[])

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
                    {lights ? (
                      lights.map((light:any, index:any) => (
                        <div className="flex items-center mb-4 gap-10" key={index}>
                          <LightCard
                            min={0}
                            value={masterLightIntensity}
                            label={light["name"]}
                            onChange={({ min }: { min: number }) => {}}
                          />
                        </div>
                      ))
                    ) : (
                      <h1 className="text-white">Loading...</h1>
                    )}
                  </div>
                  <div className="flex items-center h-full object-fill">
                    <RangeSlider
                      min={0}
                      onChange={({ min }: { min: number }) => {
                        handleMasterLightIntensity(min);
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

  //TODO: Test out GET,POST and PUT Requests for light info