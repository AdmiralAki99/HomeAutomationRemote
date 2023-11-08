import {View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';

import { Modal } from '@mui/material';

import { ScreenNavbar } from '../components/Navbar';
import { ScreenParamList } from '../App';

type CalendarProps = NativeStackScreenProps<ScreenParamList, 'Calendar'>;

function CalendarScreen({route, navigation} : CalendarProps){
    navigation.navigate('Camera')

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
      setOpenModal(true);
    }
    const clostModal = () => {
      setOpenModal(false);
    }

    return (
      <View>
        <ScreenNavbar navigation={navigation} destination={"Home"} />
        <div className='max-w-screen'>
        </div>
      </View>
    );

}

export default CalendarScreen;