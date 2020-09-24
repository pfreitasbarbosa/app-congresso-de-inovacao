import { Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Theme = StyleSheet.create(
    {
    logoStyle:{
      alignSelf: 'center',
      marginTop: windowHeight*.05,
      width: windowWidth*.3,
      height: windowHeight*.22,
      resizeMode: 'contain'
    },
    circularProgressPositioning:{
      alignItems: 'center',
      marginTop: windowHeight*.1,
      marginLeft: windowWidth*.41
    }
    }
);
export default Theme;