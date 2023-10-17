import React ,{useState, useEffect} from 'react';
import { useTheme } from '@mui/material/styles';
import { Button,IconButton,Box,Card,CardContent,Grid,CardMedia,Paper,Slide,MobileStepper,Typography} from '@mui/material';
import {ChevronRight,ChevronLeft} from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel'
import { CardTitle } from './@/components/ui/card';

function App() {
  return (
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
        <a className="block max-w-lg w-80 h-30 bg-black border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70 relative">
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
        <a className="block max-w-lg w-80 h-30 bg-black border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70 relative">
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
        <a className="block max-w-lg w-80 h-30 bg-black border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70 relative">
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
      </div>
    </div>
  );
}

export default App;