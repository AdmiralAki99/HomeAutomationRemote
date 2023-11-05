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

type testProps = NativeStackScreenProps<ScreenParamList, 'Test'>;

function TestScreen({route, navigation} : testProps){
    navigation.navigate('Test')
    const [data,setData] = useState<Record<string,any>>([{}])

  const handleClick = async () =>{
    await fetch("/light/1",{method:'GET'}).then(
      res => res.json()
    ).then(
      data => {
        setData(data)
      }
    )
  }

  const updateLight = async () =>{
    await fetch("/light/1",{method:'POST', body:JSON.stringify({state:'off'})}).then(
      res => res.json()
    ).then(
      data => {
        // setData(data)
        console.log(data)
      }
    )
  }

    return(
        <View>
            {/* <h1>Test Screen</h1>
            <Button onClick={() => navigation.navigate('Light')}>
                Light Screen
            </Button> */}
            <LightScreenNavBar navigation={navigation} destination={"Home"} />
            <Button onClick={updateLight}>Press This</Button>
            {/* {
              data? Object.keys(data).map((key)=>(
                <p>{key}: {data[key]}</p>
              )) : <h1>loading</h1>
            } */}
        </View>
    )

}



export default TestScreen;