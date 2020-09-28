import { Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Theme = StyleSheet.create(
    {
    container:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },  
    logoStyle:{
      alignSelf: 'center',
      width: windowWidth*.3,
      height: windowHeight*.22,
      resizeMode: 'contain'
    }
    }
);
export default Theme;