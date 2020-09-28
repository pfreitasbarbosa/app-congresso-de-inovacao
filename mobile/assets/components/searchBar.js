import React from 'react';
import {View, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, Text} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import { preventAutoHide } from 'expo/build/launch/SplashScreen';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class SearchBar extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
        <View style = {styles.actionContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.profileImage}
              source={require('../13.png')}
            >
            </Image>
          </View>
          <Text style={styles.userName}>{this.props.userName}</Text>
          <Text style={styles.userCourse}>{this.props.courseName}</Text>
          <View style={styles.searchView}>
            <TouchableOpacity 
                style={styles.btnAction}
                onclick={this.props.searchEvent}>
                <Feather name="search" size={17} color="#FFF"/>
            </TouchableOpacity>
            <TextInput 
                 placeholder='Pesquisar'
                placeholderTextColor='#FFF'
                style={styles.inputField}
                onChangeText={text => this.setState({txt: text })}>
            </TextInput>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    actionContainer:{
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: '#1C2C69',
        width: windowWidth,
        height: windowHeight*.37,
        padding: "3%",
        marginBottom: "2%",
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
      },

      inputField:{
        width: "72%",
        marginRight: "3%",
        fontSize: 14,
        fontFamily: "OpenSans-Regular",
        color: '#FFFFFF',
      },

      searchView:{
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#425087',
        borderRadius: 12,
        marginTop:"3%",
      },

      btnAction:{
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10, 
        fontFamily: "OpenSans-SemiBold",
      },

      profileImage:{
        height:"100%",
        width:"100%",
        resizeMode: "stretch",
        borderRadius: 100,
      },

      imageContainer:{
        height:windowHeight*.18,
        width:windowWidth*.30,
        alignSelf: "center", 
        marginBottom: "2%",
      },

      userName:{
        fontFamily: "OpenSans-Regular",
        color: '#FFFFFF',
        alignSelf: 'center',
        fontSize: 14,
      },

      userCourse:{
        fontFamily: "OpenSans-Regular",
        color: '#FFFFFF',
        alignSelf: 'center',
        fontSize: 12,
      },
});
  