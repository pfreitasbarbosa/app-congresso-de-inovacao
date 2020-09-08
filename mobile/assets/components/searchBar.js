import React from 'react';
import {View, StyleSheet, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import { Feather } from '@expo/vector-icons';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class SearchBar extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
        <View style = {styles.actionContainer}>
            <View style={styles.searchView}>
            <TextInput 
                placeholder='Pesquisar evento'
                placeholderTextColor='#FFFFFF'
                style={styles.inputField}
                onChangeText={text => this.setState({txt: text })}>
            </TextInput>
            <TouchableOpacity 
                style={styles.btnAction}
                onclick={this.props.searchEvent}>
                <Feather name="search" size={22} color="#F8F8F8"/>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.btnAction}
                onclick={this.props.filterEvent}>
                <Feather name="filter" size={22} color="#F8F8F8"/>
            </TouchableOpacity>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    actionContainer:{
        backgroundColor: '#FF2C55',
        width: windowWidth,
        height: windowHeight*.11,
        padding: "3%",
        marginBottom: "4%",
      },
      inputField:{
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF',
        width: "72%",
        marginRight: "3%",
        fontSize: 14,
        fontFamily: "OpenSans-Regular",
        color: '#FFFFFF' 
      },
      searchView:{
        alignItems: 'baseline',
        flexDirection: 'row'
      },
      btnAction:{
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10, 
        fontFamily: "OpenSans-SemiBold",
      },
});
  