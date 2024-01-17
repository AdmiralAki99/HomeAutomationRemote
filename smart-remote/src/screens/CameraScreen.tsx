import {View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ScreenNavbar } from '../components/Navbar';
import CameraCard from '../components/CameraCard';
import { ScreenParamList } from '../App';
import { useEffect, useRef} from 'react';

type CameraProps = NativeStackScreenProps<ScreenParamList, 'Camera'>;

function CameraScreen({route, navigation} : CameraProps){
    navigation.navigate('Camera')

    const videoRef = useRef<HTMLVideoElement>(null)

    const getVideoFeed = async () => {
        const resp = await fetch('/camera/get/feed')
        const blob = await resp.blob()
        
        if(videoRef.current){
            videoRef.current.src = URL.createObjectURL(blob)
        }
    }

    useEffect(() =>{
    })

    return (
      <View>
        <ScreenNavbar navigation={navigation} destination={"Home"} />
        <div>
          <div className='grid grid-cols-2 justify-between pl-2 pt-4 w-screen max-w-screen-md h-screen max-h-screen'>
            <CameraCard cameraName='Camera 1' cameraUrl='link' />
            <CameraCard cameraName='Camera 2' cameraUrl='link' />
            <CameraCard cameraName='Camera 3' cameraUrl='link' />
            <CameraCard cameraName='Camera 4' cameraUrl='link' />
          </div>
        </div>
      </View>
    );

}

export default CameraScreen;