import React ,{useState, useEffect} from 'react';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@mui/material';
import {View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenParamList } from '../App';

type testProps = NativeStackScreenProps<ScreenParamList, 'Test'>;

function TestScreen({route, navigation} : testProps){
    navigation.navigate('Test')

    return(
        <View>
            <h1>Test Screen</h1>
            <Button onClick={() => navigation.navigate('Light')}>
                Light Screen
            </Button>
        </View>
    )

}



export default TestScreen;