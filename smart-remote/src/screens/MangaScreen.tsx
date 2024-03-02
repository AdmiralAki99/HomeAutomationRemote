import React ,{useState, useEffect} from 'react';

import {View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenParamList } from '../App';
import {ScreenNavbar } from '../components/Navbar';

import { ReactReader } from 'react-reader'

import EpubReader from '../components/MangaReader';
import MangaReader from '../components/MangaReader';



type mangaProps = NativeStackScreenProps<ScreenParamList, 'Manga'>;

function MangaScreen({route, navigation} : mangaProps){
  const [location, setLocation] = useState<string | number>(0);

  

  return (
    <View>
      <ScreenNavbar navigation={navigation} destination={"Home"} />
      <div>
        <div className='flex flex-col bg-noir m-auto pt-10'>
          <div className='flex overflow-x-scroll pb-10 hide-scroll-bar'>
              <div className='flex flex-nowrap lg:ml-40 md:ml-20 ml-10'>
                <div className='inline-block px-3'>
                    <div className='w-40 h-60 max-w-xs overflow-hidden rounded-lg shadow-md bg-bubblegum hover:shadow-xl transition-none duration-300 ease-in-out shadow-white'>

                    </div>
                </div>
              </div>
          </div>
        </div>
        <MangaReader volumeLocation=''/>
      </div>
    </View>
  );
}



export default MangaScreen;