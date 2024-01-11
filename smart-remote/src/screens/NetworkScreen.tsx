import {View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';

import { NetworkScreenNavBar, ScreenNavbar } from '../components/Navbar';
import { ScreenParamList } from '../App';

import NetworkCard from '../components/NetworkCard'

type NetworkProps = NativeStackScreenProps<ScreenParamList, 'Network'>;

function NetworkScreen({route, navigation} : NetworkProps){
    const [networkDevices, setNetworkDevices] = useState([])

    const isEmpty = (val: any) => val == null || !(Object.keys(val) || val).length;

    navigation.navigate('Network')

    const getNetworkDevices = () =>{
        fetch('/network/get/all',{method:'GET'}).then(response => response.json()).then(
            data => {
                setNetworkDevices(data.devices)
            }
        )
    }

    useEffect(()=>{
        getNetworkDevices()
    })

    return(
        <View>
            <NetworkScreenNavBar navigation={navigation} destination={"Home"} />
            <div className='grid grid-cols-2 justify-between pl-7 pt-4 bg-noir w-screen max-w-screen-md h-screen max-h-screen'>
                {isEmpty(networkDevices) ? <div></div> : networkDevices.map((device: any) => {
                    return <NetworkCard deviceName={device.name} ipAddress={device.ip} macAddress={device.mac} wakeStatus={device.status}/>
                })}
            </div>
        </View>
    )

}

export default NetworkScreen;