import React ,{useState, useEffect} from 'react';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@mui/material';
import {View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenParamList } from '../App';

import { HomeScreenNavbar, LightScreenNavBar, ScreenNavbar } from '../components/Navbar';
import LightCard from '../components/LightCard';

type testProps = NativeStackScreenProps<ScreenParamList, 'Test'>;

function TestScreen({route, navigation} : testProps){
    navigation.navigate('Test')

    return(
        <View>
            {/* <h1>Test Screen</h1>
            <Button onClick={() => navigation.navigate('Light')}>
                Light Screen
            </Button> */}
            <LightScreenNavBar navigation={navigation} destination={"Home"} />
        </View>
    )

}



export default TestScreen;