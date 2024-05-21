import { Button,IconButton,Box,Card,CardContent,Grid,CardMedia,Paper,Slide,MobileStepper,Typography} from '@mui/material';
import {ChevronRight,ChevronLeft,Pause,PlayArrow,SkipPrevious,SkipNext,VolumeMute,VolumeUp,Speaker,Apple,Lightbulb,LightMode,Camera,House,Person, Home,Menu,Google,CalendarMonth,WifiTethering,AutoStories} from '@mui/icons-material';
import {View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenParamList } from '../App';
import { useEffect, useState } from 'react';
import { HomeScreenNavbar } from '../components/Navbar';
import { response } from 'express';
import axios from 'axios';
import { log } from 'console';

type HomeScreenProps = NativeStackScreenProps<ScreenParamList, 'Home'>;


function HomeScreen({route, navigation} : HomeScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo , setSongInfo] = useState<Record<string,any>>({});
  const [currentVolume, setCurrentVolume] = useState(0);

  const getSongName = async () => {
    await fetch('/spotify/get/current',{method: 'GET'}).then(res => res.json()).then(
      (val) => {
        if(val == null){
          return
        }
        setSongInfo(val)
        if(val["device"]["is_playing"] == true){
          setIsPlaying(true)
        }else{
          setIsPlaying(false)
        }
      })
  }

  const nextSong = async () => {
    await fetch('/spotify/next',{method: 'POST'}).then(res => res.json()).then(
      (val) => {
        // console.log(val)
      }
    )
  }

  const prevSong = async () => {
    await fetch('/spotify/prev',{method: 'POST'}).then(response => response.json()).then(
      // (val) => console.log(val)
    )
  }

  const getCurrentVolume = async () => {
    await fetch('/spotify/get/volume',{method: 'GET'}).then(
      (response) => response.json()
    ).then(
      (val) => setCurrentVolume(val.volume)
    )
  }

  const handleVolumeChange = async (value: number) => {
    await axios.put('/spotify/set/volume', {
      volume: value
    }).then((response) => {
      
    })
  }

  const controlPlayback = async () => {
    if(isPlaying){
      await fetch('/spotify/pause',{method: 'GET'}).then(
        (response) => response.json()
      ).then(
        (val) => {
          setIsPlaying(false)
        }
      )
    }else{
      await fetch('/spotify/play',{method: 'GET'}).then(
        (response) => response.json()
      ).then(
        (val) => {
          setIsPlaying(true)
        }
      )
    }
  }

  const isEmpty = (val: any) => val == null || !(Object.keys(val) || val).length;

  useEffect(()=> {
    // handleLogin()

    const timeInterval = setInterval(()=>{
      getSongName()
      getCurrentVolume()
    },3000)

    const loginInterval = setInterval(()=>{
      console.log("Logging in")
      handleLogin()
    },(1000*60*60))
  },[])

  const handlePlayPause = () => {
    controlPlayback()
  };

  const handleLogin = async () => {
    try {
      const response = await axios.get('/spotify/login', {
        withCredentials: true,
      });
  
      if (response.status === 200) {
        window.location.href = response.request.responseURL;
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error during Spotify login:', error);
    }
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
              {/* <a className="block max-w-lg w-80 h-30 bg-noir rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70 relative">
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
              </a> */}
              <a className="block max-w-lg w-80 h-30 bg-noir rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70 relative">
                <div className="grid grid-rows-3 max-h-40 grid-flow-col bg-yellow-300">
                  <div className="col col-start-1 col-end-4 flex justify-center items-center bg-noir gap-20 pl-4 ">
                    <button>
                      <Google sx={{ color: "gray" }} />
                    </button>
                    <div className="row pt-4">
                      <h5 className="bg-noir text-white text-lg pr-4">
                        Google Nest Mini
                      </h5>
                      <h5 className="bg-noir text-white text-xs">
                        Smart Audio Line-Up
                      </h5>
                    </div>
                  </div>
                  <div className="col col-start-1 col-end-4 flex justify-center items-center bg-noir gap-4 pl-4 ">
                    <img
                      src={
                        isEmpty(songInfo)
                          ? ""
                          : songInfo["album"]["images"][0]["url"]
                      }
                      alt="image 3"
                      className="w-10 h-10 object-cover shadow-lg shadow-gray-400/50"
                    />
                    <div className="row pt-2">
                      <div className="grid grid-cols-1">
                        <h5 className="bg-noir text-white font-bold text-sm truncate">
                          {isEmpty(songInfo) === true ? "-" : songInfo["name"]}
                        </h5>
                        <h5 className="bg-noir text-white text-sm">
                          {isEmpty(songInfo) === true
                            ? "-"
                            : songInfo["artists"]["name"]}
                        </h5>
                      </div>
                    </div>
                    <div className="row pt-2">
                      <h5 className="bg-noir text-white font-bold text-sm">
                        <button>
                          <SkipPrevious sx={{ color: "white" }} />
                        </button>
                        {isPlaying ? (
                          <Button
                            onClick={() => handlePlayPause()}
                            size="small"
                            disableRipple={true}
                            style={{ backgroundColor: "transparent" }}
                          >
                            <Pause sx={{ color: "white" }} />
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handlePlayPause()}
                            size="small"
                            disableRipple={true}
                            style={{ backgroundColor: "transparent" }}
                          >
                            <PlayArrow sx={{ color: "white" }} />
                          </Button>
                        )}
                        <button onClick={nextSong}>
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
                      min={0}
                      value={currentVolume}
                      max={100}
                      type="range" onChange={(volume)=>{handleVolumeChange(parseInt(volume.target.value))}}
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
                    {/* <p className="text-gray-50 pt-6">Brightness: 75%</p>
                    <p className="text-gray-50">Lights: 12</p> */}
                  </div>
                  <div className="row row-start-1 row-end-4 flex justify-center items-center bg-pink-600">
                    <button onClick={() => navigation.navigate("Light")}>
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
                  </div>
                  <div className="row row-start-1 row-end-4 flex justify-center items-center bg-pink-600">
                    <button onClick={() => navigation.navigate("Camera")}>
                      <ChevronRight sx={{ color: "white" }} />
                    </button>
                  </div>
                </div>
              </a>
              <a className="block max-w-lg w-80 h-30 bg-noir rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70 relative">
                <div className="grid grid-rows-3 max-h-40 grid-flow-col gap-4">
                  <div className="row row-start-1 row-end-4 flex justify-center items-center bg-noir border-r border-r-white">
                    <button>
                      <CalendarMonth sx={{ color: "white" }} fontSize="large" />
                    </button>
                  </div>
                  <div className="row row-start-1 items-center bg-noir mb-auto">
                    <h5 className="text-5xl font-bold tracking-tight text-white pt-7">
                      Calendar
                    </h5>
                    <p className="text-gray-50 pt-6">Events Today : 1</p>
                    <p className="text-gray-50">Day Looks: Busy</p>
                  </div>
                  <div className="row row-start-1 row-end-4 flex justify-center items-center bg-pink-600">
                    <button onClick={() => navigation.navigate("Calendar")}>
                      <ChevronRight sx={{ color: "white" }} />
                    </button>
                  </div>
                </div>
              </a>
              <a className="block max-w-lg w-80 h-30 bg-noir rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70 relative">
                <div className="grid grid-rows-3 max-h-40 grid-flow-col gap-4">
                  <div className="row row-start-1 row-end-4 flex justify-center items-center bg-noir border-r border-r-white">
                    <button>
                      <WifiTethering sx={{ color: "white" }} fontSize="large" />
                    </button>
                  </div>
                  <div className="row row-start-1 items-center bg-noir mb-auto">
                    <h5 className="text-5xl font-bold tracking-tight text-white pt-7">
                      Network
                    </h5>
                    <p className="text-gray-50 pt-6">Devices On Network : 1</p>
                  </div>
                  <div className="row row-start-1 row-end-4 flex justify-center items-center bg-pink-600">
                    <button onClick={() => navigation.navigate("Network")}>
                      <ChevronRight sx={{ color: "white" }} />
                    </button>
                  </div>
                </div>
              </a>
              <a className="block max-w-lg w-80 h-30 bg-noir rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70 relative">
                <div className="grid grid-rows-3 max-h-40 grid-flow-col gap-4">
                  <div className="row row-start-1 row-end-4 flex justify-center items-center bg-noir border-r border-r-white">
                    <button>
                      <AutoStories sx={{ color: "white" }} fontSize="large" />
                    </button>
                  </div>
                  <div className="row row-start-1 items-center bg-noir mb-auto">
                    <h5 className="text-5xl font-bold tracking-tight text-white pt-7">
                      Manga
                    </h5>
                    <p className="text-gray-50 pt-6">Continue Reading... 1</p>
                  </div>
                  <div className="row row-start-1 row-end-4 flex justify-center items-center bg-pink-600">
                    <button onClick={() => navigation.navigate("Manga")}>
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