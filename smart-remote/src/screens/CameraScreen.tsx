import {View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CameraScreenNavbar } from '../components/Navbar';
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
        <div>
          <CameraScreenNavbar navigation={navigation} destination={"Home"} />
          <div className='bg-noir h-screen flex w-screen'>
            <div className="grid grid-cols-2 grid-flow-row pl-2 pt-20 w-screen h-screen max-w-screen bg-transparent border-white">
              <CameraCard cameraName="Camera 1" cameraUrl="/camera/get/feed" />
              <CameraCard cameraName="Camera 2" cameraUrl="link" />
              <CameraCard cameraName="Camera 3" cameraUrl="link" />
              <CameraCard cameraName="Camera 4" cameraUrl="link" />
              <CameraCard cameraName="Camera 5" cameraUrl="link" />
              <CameraCard cameraName="Camera 6" cameraUrl="link" />
            </div>
          </div>
        </div>
      </View>
    );

}

export default CameraScreen;