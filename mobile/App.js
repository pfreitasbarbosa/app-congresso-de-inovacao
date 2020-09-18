import React, {useState} from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import {RouteLogin,RouteFeed} from './src/routes';

const getFonts = () => Font.loadAsync({
    'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),

    'Sofia-Bold': require('./assets/fonts/Sofia-Bold.ttf'),
    'Sofia-Light': require('./assets/fonts/Sofia-Light.ttf'),
    'Sofia-Medium': require('./assets/fonts/Sofia-Medium.ttf'),
    'Sofia-Regular': require('./assets/fonts/Sofia-Regular.ttf'),
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if(fontsLoaded){
    return ( 
      <RouteLogin /> 
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
