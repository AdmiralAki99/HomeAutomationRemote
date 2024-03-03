import React ,{useState, useEffect} from 'react';
import axios from 'axios';

import {View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenParamList } from '../App';
import {ScreenNavbar } from '../components/Navbar';

import { ReactReader } from 'react-reader'

import EpubReader from '../components/MangaReader';
import MangaReader from '../components/MangaReader';



type mangaProps = NativeStackScreenProps<ScreenParamList, 'Manga'>;

function MangaScreen({route, navigation} : mangaProps){

  const [mangaFeed, setMangaFeed] = useState<any>([]);
  const [randomGenre, setRandomGenre] = useState<any>([]);

  useEffect(()=>{
    getMangaFeed();
    getRandomGenre();
  },[])

  const getMangaFeed = async () => {
    try{
      const resp = await axios.post('/manga/search',{'title':''})
      setMangaFeed(resp.data);
    }
    catch(e){
      console.log('Error fetching manga feed')
    }
  }

  const getRandomGenre = async () => {
    try{
      const resp = await axios.get('/manga/genre/random')
      setRandomGenre(resp.data);
    }
    catch(e){
      console.log('Error fetching random genre')
    }
  
  }

  return (
    <View>
      <ScreenNavbar navigation={navigation} destination={"Home"} />
      <div>
        <div className='flex flex-row bg-noir m-auto pt-10'>
          <div className='flex overflow-x-scroll pb-10 hide-scroll-bar'>
              <div className='flex flex-nowrap lg:ml-40 md:ml-20 ml-10'>
                 {
                    mangaFeed.map((manga:any)=>{
                      return (
                        <div className="inline-block px-3">
                          <div className="w-40 h-60 max-w-xs overflow-hidden rounded-lg shadow-md bg-bubblegum hover:shadow-xl transition-none duration-300 ease-in-out shadow-white">
                            <img src={manga.coverArt} className='w-40 h-60'></img>
                          </div>
                        </div>
                      );
                    })
                  }
              </div>
          </div>
        </div>
        <div className='flex flex-row bg-noir m-auto pt-10'>
          <div className='flex overflow-x-scroll pb-10 hide-scroll-bar'>
              <div className='flex flex-nowrap lg:ml-40 md:ml-20 ml-10'>
                 {
                    randomGenre.map((manga:any)=>{
                      return (
                        <div className="inline-block px-3">
                          <div className="w-40 h-60 max-w-xs overflow-hidden rounded-lg shadow-md bg-bubblegum hover:shadow-xl transition-none duration-300 ease-in-out shadow-white">
                            <img src={manga.manga.coverArt} className='w-40 h-60'></img>
                          </div>
                        </div>
                      );
                    })
                  }
              </div>
          </div>
        </div>
        <button onClick={getMangaFeed}>Fetch</button>
      </div>
    </View>
  );
}



export default MangaScreen;