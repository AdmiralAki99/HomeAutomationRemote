import React ,{useState, useEffect} from 'react';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@mui/material';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenParamList } from '../App';
import {Keyboard, Text, TextInput, StyleSheet, View} from 'react-native';
import { KeyboardComponent } from '../components/KeyboardComponent';

import { HomeScreenNavbar, LightScreenNavBar, ScreenNavbar } from '../components/Navbar';
import LightCard from '../components/LightCard';
import { light } from '@mui/material/styles/createPalette';
import axios from 'axios';
import { error } from 'console';

type testProps = NativeStackScreenProps<ScreenParamList, 'Test'>;

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 36,
  },
  input: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4,
  },
  status: {
    padding: 10,
    textAlign: 'center',
  },
});


function TestScreen({route, navigation} : testProps){
    navigation.navigate('Test')
    const [data,setData] = useState<Record<string,any>>([])
    const [modalOpen, setOpen] = useState(false);
    const [keyboardStatus, setKeyboardStatus] = useState('');

    useEffect(() => {
      const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardStatus('Keyboard Shown');
      });
      const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardStatus('Keyboard Hidden');
      });
  
      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []);

  const handleOpen = () =>{
    setOpen(true)
  }

  const handleClose = () =>{
    setOpen(false)
  }

  const isEmpty = (val: any) => val == null || !(Object.keys(val) || val).length;

  const handleLogin = async () => {
    try {
      const response = await axios.get('/spotify/login').catch((error) => {
        console.error('Error during Spotify login:', error);
      })
    } catch (error) {
      console.error('Error during Spotify login:', error);
    }
  };

    return (
      <View>
        <KeyboardComponent/>
      </View>
    );

}



export default TestScreen;