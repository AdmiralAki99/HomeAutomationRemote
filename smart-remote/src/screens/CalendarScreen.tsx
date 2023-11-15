import {View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';

import { Calendar } from '../@/components/ui/calendar';

import { ScreenNavbar } from '../components/Navbar';
import { ScreenParamList } from '../App';

type CalendarProps = NativeStackScreenProps<ScreenParamList, 'Calendar'>;

function CalendarScreen({route, navigation} : CalendarProps){
    const [date,setDate] = useState<Date|undefined>(new Date())

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
        <div className='max-w-screen w-screen'>
          <Calendar mode='single' selected={date} onSelect={setDate} className='rounded-md border text-white border-white bg-black'/>
        </div>
      </View>
    );

}

export default CalendarScreen;