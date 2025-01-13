import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { View } from 'react-native'

import { RootStackParamList } from '../App'
import '../styles/HomeScreen.css'

/* Icons for the cards*/
import { BusFrontFill, BookHalf, Calendar, Film, Pc, House } from 'react-bootstrap-icons'

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>

import Card from '../components/Card'
import AnalogClock from '../components/AnalogClock'

function HomeScreen({ route, navigation }: HomeScreenProps) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <div className="bg-home w-full h-1/4">
        <div className="pt-10 pb-10 bg-home">
          <AnalogClock />
        </div>
        <div className="flex items-center justify-center pt-2 pb-20 bg-home">
          <div className="grid grid-cols-1 items-center justify-center gap-6 p-6">
            <Card
              title="Home"
              navigation={navigation}
              route="SmartDevice"
              subtitle="Subtitle"
              icon={<House color="white" />}
            />
            <Card
              title="Reader"
              navigation={navigation}
              route="Reader"
              subtitle="Subtitle"
              icon={<BookHalf color="white" />}
            />
            <Card
              title="Media"
              navigation={navigation}
              route="Media"
              subtitle="Subtitle"
              icon={<Film color="white" />}
            />
            <Card
              title="Calendar"
              navigation={navigation}
              route="Calendar"
              subtitle="Subtitle"
              icon={<Calendar color="white" />}
            />
            <Card
              title="PC"
              navigation={navigation}
              route="PC"
              subtitle="Subtitle"
              icon={<Pc color="white" />}
            />
            <Card
              title="MBTA"
              navigation={navigation}
              route="MBTA"
              subtitle="Subtitle"
              icon={<BusFrontFill color="white" />}
            />
          </div>
        </div>
      </div>
    </View>
  )
}

export default HomeScreen
