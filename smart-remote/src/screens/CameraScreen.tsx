import {View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ScreenNavbar } from '../components/Navbar';
import { ScreenParamList } from '../App';

type CameraProps = NativeStackScreenProps<ScreenParamList, 'Camera'>;

function CameraScreen({route, navigation} : CameraProps){
    navigation.navigate('Camera')

    return(
        <View>
            {/* <h1>Test Screen</h1>
            <Button onClick={() => navigation.navigate('Light')}>
                Light Screen
            </Button> */}
            <ScreenNavbar navigation={navigation} destination={"Home"} />
        </View>
    )

}

export default CameraScreen;