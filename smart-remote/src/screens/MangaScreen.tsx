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
        <MangaReader volumeLocation=''/>
      </div>
    </View>
  );
}



export default MangaScreen;