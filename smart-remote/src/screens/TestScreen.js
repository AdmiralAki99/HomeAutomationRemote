import React ,{useState, useEffect} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@mui/material';
import {View} from 'react-native';

function TestScreen(){
    const navigation = useNavigation();

    return(
        <View>
            <h1>Test Screen</h1>
            <Button onClick={
                navigation.navigate('Light')
            }>Text Button</Button>
        </View>
    )

}

export default TestScreen;