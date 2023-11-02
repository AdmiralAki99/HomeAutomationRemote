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
    const [data,setData] = useState([{}])

  const handleClick = async () =>{
    await fetch("/light",{method:'GET'}).then(
      res => res.json()
    ).then(
      data => {
        setData(data)
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
            <Button onClick={handleClick}>Press This</Button>
            {
              data? Object.keys(data).map((light,index)=>(
                <p>{light}</p>
              )) : <h1>loading</h1>
            }
        </View>
    )

}



export default TestScreen;