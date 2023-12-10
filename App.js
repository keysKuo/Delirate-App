import { View, StyleSheet, StatusBar } from 'react-native';
import AppNavigator from './AppNavigator';
import { ThemeProvider } from '@rneui/themed';
import { useFonts } from 'expo-font';
import FullScreenLoader from './components/FullScreenLoader';


export default function App() {

  const [isReady] = useFonts({
    "Ubuntu": require('./assets/fonts/Ubuntu-Medium.ttf')
  })

  if(!isReady) {
    return (
      <FullScreenLoader />
    );
  }

  return (
    <ThemeProvider  style={{ flex: 1 }}>
      {/* <StatusBar backgroundColor='black'/> */}
      <AppNavigator />
    </ThemeProvider>
  )
}

