import React ,{useState, useEffect} from 'react';
import { useTheme } from '@mui/material/styles';
import { Button,IconButton,Box,Card,CardContent,Grid,CardMedia,Paper,Slide,MobileStepper,Typography} from '@mui/material';
import {ChevronRight,ChevronLeft,Pause,PlayArrow,SkipPrevious,SkipNext,VolumeMute,VolumeUp,Speaker,Apple,Lightbulb} from '@mui/icons-material';
import { CardTitle } from './@/components/ui/card';
import { Carousel } from '@material-tailwind/react';

function App() {
  return (
    <div className="bg-gray-800">
      <div>
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
            <a className="block max-w-lg w-80 h-30 bg-black rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70 relative">
              <div className="grid grid-rows-3 max-h-40 grid-flow-col gap-4">
                <div className="row row-start-1 row-end-4 flex justify-center items-center bg-black border-r border-r-white">
                  <button>
                    <ChevronRight sx={{ color: "white" }} />
                  </button>
                </div>
                <div className="row row-start-1 items-center bg-black mb-auto">
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
                <div className="row row-start-1 row-end-4 flex justify-center items-center bg-pink-600">
                  <button>
                    <ChevronRight sx={{ color: "white" }} />
                  </button>
                </div>
              </div>
            </a>
            <a className="block max-w-lg w-80 h-30 bg-black rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70 relative">
              <div className="grid grid-rows-3 max-h-40 grid-flow-col bg-yellow-300">
                <div className="col col-start-1 col-end-4 flex justify-center items-center bg-black gap-24 ">
                  <button>
                    <Apple sx={{ color: "gray" }} />
                  </button>
                  <div className="row pt-2">
                    <h5 className="bg-black text-white text-lg pr-4">
                      Apple Homepod
                    </h5>
                    <h5 className="bg-black text-white text-xs">
                      Smart Audio Line-Up
                    </h5>
                  </div>
                </div>
                <div className="col col-start-1 col-end-4 flex justify-center items-center bg-black gap-4 ">
                  <img
                    src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                    alt="image 3"
                    className="w-10 h-10 object-cover shadow-lg shadow-gray-400/50"
                  />
                  <div className="row pt-2">
                    <h5 className="bg-black text-white font-bold text-sm">
                      Do I Wanna Know?
                    </h5>
                    <h5 className="bg-black text-white text-sm">
                      Arctic Monkeys
                    </h5>
                  </div>
                  <div className="row pt-2">
                    <h5 className="bg-black text-white font-bold text-sm">
                      <button>
                        <SkipPrevious sx={{ color: "white" }} />
                      </button>
                      <button>
                        <PlayArrow sx={{ color: "white" }} />
                      </button>
                      <button>
                        <SkipNext sx={{ color: "white" }} />
                      </button>
                    </h5>
                  </div>
                </div>
                <div className="col col-start-1 col-end-4 flex justify-center items-center bg-black pl-2 pr-2 ">
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
            <a className="block max-w-lg w-80 h-30 bg-black rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70 relative">
              <div className="grid grid-rows-3 max-h-40 grid-flow-col gap-4">
                <div className="row row-start-1 row-end-4 flex justify-center items-center bg-black border-r border-r-white">
                  <button>
                    <Lightbulb sx={{color: 'white'}} fontSize='large'/>
                  </button>
                </div>
                <div className="row row-start-1 items-center bg-black mb-auto">
                  <div className="flex flex-col-2">
                    <h5 className="text-lg font-bold tracking-tight text-white pt-4">
                      Lights
                    </h5>
                  </div>

                  <p className="text-gray-50 text-">Card Content</p>
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
    </div>
  );
}

export default App;