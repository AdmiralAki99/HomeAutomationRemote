import {View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ScreenNavbar } from '../components/Navbar';
import { ScreenParamList } from '../App';

import NetworkCard from '../components/NetworkCard'

type NetworkProps = NativeStackScreenProps<ScreenParamList, 'Network'>;

function NetworkScreen({route, navigation} : NetworkProps){
    navigation.navigate('Network')

    return(
        <View>
            <ScreenNavbar navigation={navigation} destination={"Home"} />
            <div className='grid grid-cols-2 justify-between pl-7'>
                <NetworkCard/>
                <NetworkCard/>
                <NetworkCard/>

            </div>
        </View>
    )

}

export default NetworkScreen;