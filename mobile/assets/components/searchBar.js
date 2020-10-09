import React from 'react';
import {View, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, Text, Animated} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import { preventAutoHide } from 'expo/build/launch/SplashScreen';
import {RFValue} from "react-native-responsive-fontsize";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class SearchBar extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
        <Animated.View style={styles.actionContainer}>
          <TouchableOpacity onPress={this.props.logoutFunction} style={styles.logoutButton}>
              <Feather name="log-out" size={32} color="#FFF"/>
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            <Image
              style={styles.profileImage}
              source={require('../kirby.png')}
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
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
    actionContainer:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: '#1C2C69',
        width: windowWidth,
        height: windowHeight*.35,
        paddingHorizontal: "3%",
        marginBottom: "2%",
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
      },

      inputField:{
        width: "72%",
        marginRight: "3%",
        fontSize: RFValue(17),
        fontFamily: "Sofia-Regular",
        color: '#FFFFFF',
      },

      searchView:{
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#425087',
        borderRadius: 12,
        marginTop: '2%',
      },

      btnAction:{
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10, 
        fontFamily: "Sofia-Medium",
      },

      profileImage:{
        height:"100%",
        width:"100%",
        borderRadius: 100,
        resizeMode: "stretch",
      },

      imageContainer:{
        height:windowHeight*.18,
        width:windowWidth*.30,
        alignSelf: "center", 
        justifyContent: "center",
        marginBottom: "2%",
      },

      userName:{
        fontFamily: "Sofia-Regular",
        color: '#FFFFFF',
        alignSelf: 'center',
        fontSize: RFValue(17),
      },

      userCourse:{
        fontFamily: "Sofia-Regular",
        color: '#FFFFFF',
        alignSelf: 'center',
        fontSize: RFValue(15),
      },

      logoutButton:{
        position: "absolute",
        marginLeft: "2%",
        marginTop:"2%",
      }
});
  