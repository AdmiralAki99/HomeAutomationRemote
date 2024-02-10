import React ,{useState, useEffect} from 'react';

import {View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenParamList } from '../App';
import {ScreenNavbar } from '../components/Navbar';

import { ReactReader } from 'react-reader'

import EpubReader from '../components/EpubReader';



type epubProps = NativeStackScreenProps<ScreenParamList, 'Epub'>;

function EpubScreen({route, navigation} : epubProps){
  const [location, setLocation] = useState<string | number>(0);

  return (
    <View>
      <ScreenNavbar navigation={navigation} destination={"Home"} />
      <EpubReader bookLocation='https://react-reader.metabits.no/files/alice.epub'/>
    </View>
  );
}



export default EpubScreen;