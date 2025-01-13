import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import SmartDeviceScreen from './screens/SmartDeviceScreen'
import ReaderScreen from './screens/ReaderScreen'
import ComicInfoScreen from './screens/ComicInfoScreen'
import ComicReaderScreen from './screens/ComicReaderScreen'
import MediaScreen from './screens/MediaScreen'
import MovieInfoScreen from './screens/MovieInfoScreen'
import MediaPlayerScreen from './screens/MediaPlayerScreen'
import ShowInfoScreen from './screens/ShowInfoScreen'

export type RootStackParamList = {
  Home: undefined
  SmartDevice: undefined
  Reader: undefined
  ComicInfo : undefined
  ComicReader: undefined
  Media: undefined
  MediaPlayerScreen: undefined
  MovieInfo: undefined
  ShowInfo: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function App(): JSX.Element {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SmartDevice" component={SmartDeviceScreen} />
          <Stack.Screen name="Reader" component={ReaderScreen} />
          <Stack.Screen name="ComicInfo" component={ComicInfoScreen} />
          <Stack.Screen name="ComicReader" component={ComicReaderScreen} />
          <Stack.Screen name="Media" component={MediaScreen} />
          <Stack.Screen name="MovieInfo" component={MovieInfoScreen} />
          <Stack.Screen name="MediaPlayerScreen" component={MediaPlayerScreen} />
          <Stack.Screen name="ShowInfo" component={ShowInfoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default App
