import React ,{useState, useEffect} from 'react';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@mui/material';
import {View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenParamList } from '../App';

import { HomeScreenNavbar, LightScreenNavBar, ScreenNavbar } from '../components/Navbar';
import LightCard from '../components/LightCard';
import { light } from '@mui/material/styles/createPalette';
import axios from 'axios';
import { error } from 'console';

type testProps = NativeStackScreenProps<ScreenParamList, 'Test'>;

function TestScreen({route, navigation} : testProps){
    navigation.navigate('Test')
    const [data,setData] = useState<Record<string,any>>([])

  const handleClick = async () =>{
    await fetch("/light/all",{method:'GET'}).then(
      res => res.json()
    ).then(
      val => {
        setData(val)
      }
    )
  }

  const isEmpty = (val: any) => val == null || !(Object.keys(val) || val).length;

  const updateLight = async () =>{
    // await fetch("/light/3",{method:'PUT',body: JSON.stringify({state:"off"})}).then(
    //   res => res.json()
    // ).then(
    //   data => {
    //     // setData(data)
    //     console.log(data)
    //   }
    // )
    axios.put("/light/3",{state:"off"}).then(
      response => console.log(response)
    ).catch(error => console.log(error))
  }

    return (
      <View>
        {/* <h1>Test Screen</h1>
            <Button onClick={() => navigation.navigate('Light')}>
                Light Screen
            </Button> */}
        <LightScreenNavBar navigation={navigation} destination={"Home"} />
        <Button onClick={handleClick}>Press This</Button>
        {isEmpty(data) === true ? (
          <h1>Loading....</h1>
        ) : (
          data.map((light: any, index: any) => (
            <div key={index}>
              <h1>{light["name"]}</h1>
            </div>
          ))
        )}
      </View>
    );

}



export default TestScreen;