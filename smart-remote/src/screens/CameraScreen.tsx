import {View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ScreenNavbar } from '../components/Navbar';
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

    return (
      <View>
        <ScreenNavbar navigation={navigation} destination={"Home"} />
        <div>
          <div className='p-6'>
            <img src='/camera/get/feed' />
          </div>
        </div>
      </View>
    );

}

export default CameraScreen;