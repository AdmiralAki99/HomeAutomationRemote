import {View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ScreenNavbar } from '../components/Navbar';
import { ScreenParamList } from '../App';

type CameraProps = NativeStackScreenProps<ScreenParamList, 'Camera'>;

function CameraScreen({route, navigation} : CameraProps){
    navigation.navigate('Camera')

    return(
        <View>
            <ScreenNavbar navigation={navigation} destination={"Home"} />
        </View>
    )

}

export default CameraScreen;