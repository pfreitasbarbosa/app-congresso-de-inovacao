import {StyleSheet, Dimensions} from 'react-native';

//Get the width and height of phone.
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Theme = StyleSheet.create(
  {
    logoStyle:{
      alignSelf: 'center',
      marginTop: windowHeight*.08,
      width: windowWidth*.3,
      height: windowHeight*.22,
      resizeMode: 'contain'
    },
    formStyle:{
      alignSelf: 'center',
      marginTop: windowHeight*.05,
    },
    inputHeader:{
      color: 'white',
      fontFamily: "Sofia-Light",
      marginLeft: windowWidth*.03,
      marginTop: windowHeight*.01
    },
    inputStyle:{
      backgroundColor: 'white',
      width: windowWidth*.75,
      height: windowHeight*.07,
      padding: windowWidth*.01,
      borderRadius: 8,
      marginTop: windowHeight*.006,
      paddingLeft: '3%'
    },
    confirmButton:{
      alignItems: 'center',
      fontFamily: "Sofia-Bold",
      backgroundColor: '#EF0432',
      marginTop: windowHeight*.1,
      height: windowHeight*.08,
      paddingTop: windowHeight*.02
    }
  }
)
export default Theme;
