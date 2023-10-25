import { Button,IconButton,Box,Card,CardContent,Grid,CardMedia,Paper,Slide,MobileStepper,Typography} from '@mui/material';
import {ChevronRight,ChevronLeft,Pause,PlayArrow,SkipPrevious,SkipNext,VolumeMute,VolumeUp,Speaker,Apple,Lightbulb,LightMode,Camera,House,Person, Home,Menu} from '@mui/icons-material';
import {View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenParamList } from '../App';
import { useState } from 'react';
import { HomeScreenNavbar } from '../components/Navbar';

type HomeScreenProps = NativeStackScreenProps<ScreenParamList, 'Home'>;


function HomeScreen({route, navigation} : HomeScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <div className="bg-home">
        {/* <HomeScreenNavbar/> */}
        <div className="pb-16">
          <div className="w-full h-1/4 relative">
            <img
              src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
              alt="image 3"
              className="h-full w-full object-cover shadow-lg shadow-gray-400/50"
            />
            <h1 className="absolute text-5xl text-white top-1/2 left-1/2 -translate-x-1/2">
              Bedroom
            </h1>
          </div>
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 items-center justify-center gap-6 p-6">
              <a className="block max-w-lg w-80 h-40 p-6 bg-yellow-50 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70">
                <div className="grid grid-rows-3 grid-flow-col gap-4">
                  <div className="row row-start-1 row-end-3">01</div>
                  <div className="row row-start-1 row-end-3 items-center bg-black mb-auto">
                    <h5 className="text-3xl font-bold tracking-tight text-white">
                      Card Title
                    </h5>
                    <p className="text-white"> Card Content</p>
                    <p> Card Content</p>
                  </div>
                  <div className="row row-start-1 row-end-3">
                    <button>
                      <ChevronRight />
                    </button>
                  </div>
                </div>
              </a>
              <a className="block max-w-lg w-80 h-30 bg-noir rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70 relative">
                <div className="grid grid-rows-3 max-h-40 grid-flow-col gap-4">
                  <div className="row row-start-1 row-end-4 flex justify-center items-center bg-noir border-r border-r-white">
                    <button>
                      <ChevronRight sx={{ color: "white" }} />
                    </button>
                  </div>
                  <div className="row row-start-1 items-center bg-noir mb-auto">
                    <div className="flex flex-col-2">
                      <h5 className="text-8xl font-bold tracking-tight text-white pt-4">
                        72
                      </h5>
                      <span className="text-white row-start-2 pt-5 text-lg font-bold">
                        &#8457;
                      </span>
                    </div>

                    <p className="text-gray-50 text-">Card Content</p>
                  </div>
                  <div className="row row-start-1 row-end-4 flex justify-center items-center bg-bubblegum">
                    <button>
                      <ChevronRight sx={{ color: "white" }} />
                    </button>
                  </div>
                </div>
              </a>
              <a className="block max-w-lg w-80 h-30 bg-noir rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70 relative">
                <div className="grid grid-rows-3 max-h-40 grid-flow-col bg-yellow-300">
                  <div className="col col-start-1 col-end-4 flex justify-center items-center bg-noir gap-24 ">
                    <button>
                      <Apple sx={{ color: "gray" }} />
                    </button>
                    <div className="row pt-2">
                      <h5 className="bg-noir text-white text-lg pr-4">
                        Apple Homepod
                      </h5>
                      <h5 className="bg-noir text-white text-xs">
                        Smart Audio Line-Up
                      </h5>
                    </div>
                  </div>
                  <div className="col col-start-1 col-end-4 flex justify-center items-center bg-noir gap-4 ">
                    <img
                      src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                      alt="image 3"
                      className="w-10 h-10 object-cover shadow-lg shadow-gray-400/50"
                    />
                    <div className="row pt-2">
                      <h5 className="bg-noir text-white font-bold text-sm">
                        Do I Wanna Know?
                      </h5>
                      <h5 className="bg-noir text-white text-sm">
                        Arctic Monkeys
                      </h5>
                    </div>
                    <div className="row pt-2">
                      <h5 className="bg-noir text-white font-bold text-sm">
                        <button>
                          <SkipPrevious sx={{ color: "white" }} />
                        </button>
                        {isPlaying ? <Button onClick={()=>handlePlayPause()} size='small' disableRipple={true} style={{backgroundColor: 'transparent'}}>
                          <Pause sx={{ color: "white" }} />
                        </Button> :<Button onClick={()=>handlePlayPause()} size='small' disableRipple={true} style={{backgroundColor: 'transparent'}}>
                          <PlayArrow sx={{ color: "white" }} />
                        </Button>}
                        <button>
                          <SkipNext sx={{ color: "white" }} />
                        </button>
                      </h5>
                    </div>
                  </div>
                  <div className="col col-start-1 col-end-4 flex justify-center items-center bg-noir pl-2 pr-2 ">
                    <button>
                      <VolumeMute sx={{ color: "gray" }} />
                    </button>
                    <input
                      type="range"
                      className="accent-white h-1 w-full bg-gray-200 rounded-lg border-transparent "
                    ></input>
                    <button>
                      <VolumeUp sx={{ color: "gray" }} />
                    </button>
                  </div>
                </div>
              </a>
              <a className="block max-w-lg w-80 h-auto bg-noir rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70 relative">
                <div className="grid grid-rows-3 max-h-40 grid-flow-col gap-4">
                  <div className="row row-start-1 row-end-4 flex justify-center items-center bg-noir border-r border-r-white">
                    <button>
                      <Lightbulb sx={{ color: "white" }} fontSize="large" />
                    </button>
                  </div>
                  <div className="row row-start-1 items-center bg-noir mb-auto">
                    <div className="flex flex-col-2">
                      <h5 className="text-6xl font-bold tracking-tight text-white pt-4">
                        Lights
                      </h5>
                    </div>
                    <p className="text-gray-50 pt-6">Brightness: 75%</p>
                    <p className="text-gray-50">Lights: 12</p>
                  </div>
                  <div className="row row-start-1 row-end-4 flex justify-center items-center bg-pink-600">
                    <button onClick={
                      () => navigation.navigate('Test')
                    }>
                      <ChevronRight sx={{ color: "white" }} />
                    </button>
                  </div>
                </div>
              </a>
              <a className="block max-w-lg w-80 h-30 bg-noir rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70 relative">
                <div className="grid grid-rows-3 max-h-40 grid-flow-col gap-4">
                  <div className="row row-start-1 row-end-4 flex justify-center items-center bg-noir border-r border-r-white">
                    <button>
                      <Camera sx={{ color: "white" }} fontSize="large" />
                    </button>
                  </div>
                  <div className="row row-start-1 items-center bg-noir mb-auto">
                    <h5 className="text-5xl font-bold tracking-tight text-white pt-7">
                      Camera
                    </h5>
                    <p className="text-gray-50 pt-6">Status: Online</p>
                    <p className="text-gray-50">Card Content</p>
                  </div>
                  <div className="row row-start-1 row-end-4 flex justify-center items-center bg-pink-600">
                    <button>
                      <ChevronRight sx={{ color: "white" }} />
                    </button>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="fixed w-full h-16 max-w-lg -translate-x-1/2 bg-black border border-black rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
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
    </View>
  );
}

export default HomeScreen;