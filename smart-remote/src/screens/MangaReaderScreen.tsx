import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';

import { ScreenParamList} from '../App';


type mangaReaderProps = NativeStackScreenProps<ScreenParamList, 'Manga'>;


class MangaReaderScreen extends React.Component {
  render() {
    return (
      <View>
        <p>MangaReaderScreen</p>
      </View>
    );
  }
}

export default MangaReaderScreen;