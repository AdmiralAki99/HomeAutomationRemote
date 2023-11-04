import React ,{useState, useEffect} from 'react';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@mui/material';
import {View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenParamList } from '../App';

import { ScreenNavbar } from '../components/Navbar';

type MusicProps = NativeStackScreenProps<ScreenParamList, "Music">;

function MusicPlayerScreen({route,navigation}:MusicProps){

    return(
        <View>
            <ScreenNavbar navigation={navigation} destination={"Home"}/>
        </View>
    )
}

export default MusicPlayerScreen;