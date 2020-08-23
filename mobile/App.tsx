import React from 'react';
import Home from './src/pages/Home';
import { StatusBar } from 'react-native';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';
import { AppLoading } from 'expo';
import Routes from './src/routes';

export default function App() {
  const [fontLoaded] =  useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  });
  if (!fontLoaded) {
    return <AppLoading />
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Routes/>
    </>
  );
}