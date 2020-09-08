import React, {useState} from 'react';
import {} from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import Routes from './src/routes';

const getFonts = () => Font.loadAsync({
    'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf')
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if(fontsLoaded){
    return ( 
      <Routes /> 
    );
  }
  else{
    return(
      <AppLoading
          startAsync={getFonts}
          onFinish={()=> setFontsLoaded(true)}
      />
    );
  }
}
