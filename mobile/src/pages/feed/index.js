import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';


//Load custom fonts for application.
const getFonts = () => Font.loadAsync({
    'Roboto-Bold': require('../../../assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('../../../assets/fonts/Roboto-Regular.ttf')
  });
  
  export default function Feed() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
  
    if(fontsLoaded){
      return ( 
        <View>
          <Text style={{fontFamily: 'Roboto-Bold'}}>First Screen</Text>
        </View>
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