import { View, StyleSheet, StatusBar } from 'react-native';
import AppNavigator from './AppNavigator';
import { ThemeProvider } from '@rneui/themed';


export default function App() {
  return (
    <ThemeProvider style={{ flex: 1 }}>
      <StatusBar backgroundColor='black'/>
      <AppNavigator />
    </ThemeProvider>
  )
}

