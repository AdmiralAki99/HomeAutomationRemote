import {View} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState, ReactDOM } from 'react';

// import { Calendar } from 'react-calendar'

import CalendarScreenNavBar from '../components/CalendarNavbar';
import Calendar from '../components/Calendar';
import { KeyboardComponent } from '../components/KeyboardComponent';

import { ScreenParamList } from '../App';
import '../stylesheets/calendar.css'

type CalendarProps = NativeStackScreenProps<ScreenParamList, 'Calendar'>;

function CalendarScreen({route, navigation} : CalendarProps){
  const [date, setDate] = useState<Date | undefined>(new Date());

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const clostModal = () => {
    setOpenModal(false);
  };

  const handleDateChange = (date: Date) => {
    console.log(`${date.getDate()}${date.getMonth()+1}${date.getFullYear()}`)
  }

  const getEventsOnDate = (selectedDate: Date) => {
    const day = selectedDate.getDate();

    switch (day) {
      case 10:
        return [
          { time: "10:30 am", title: "Meeting" },
          { time: "12:00 pm", title: "Lunch" },
        ];
      case 15:
        return [
          { time: "09:30 pm", title: "Products Introduction Meeting" },
          { time: "12:30 pm", title: "Client entertaining" },
          { time: "02:00 pm", title: "Product design discussion" },
          { time: "05:00 pm", title: "Product test and acceptance" },
          { time: "06:30 pm", title: "Reporting" },
          { time: "10:00 pm", title: "Going home to walk the dog" },
        ];
      default:
        return [];
    }
  };

  return (
    <View>
      <CalendarScreenNavBar navigation={navigation} destination={"Home"} />
      <div className="max-w-screen w-screen">
        <Calendar />
      </div>
    </View>
  );
}

export default CalendarScreen