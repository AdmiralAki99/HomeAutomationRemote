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
    const [input, setInput] = useState('');
    const [inputFocused, setInputFocused] = useState(false);

   const onChange = (input:any) => {
      setInput(input);
      console.log("Input changed", input);
    };

    const onHide = () =>{
      setInputFocused(false);
    }
  
    return (
      <View>
        <input
          value={input}
          placeholder={"Tap on the virtual keyboard to start"}
          onFocus={() => {
            console.log("Input focused");
            setInputFocused(true);
          }}
        />

        <div className={`${inputFocused === false ? "hidden" : ""}`}>
          <KeyboardComponent
            onChange={onChange}
            isToggled={inputFocused}
            onHide={onHide}
          />
        </div>
      </View>
    );

}



export default TestScreen;