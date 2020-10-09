import React from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {RFValue} from "react-native-responsive-fontsize";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class EventCard extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
        <View style = {styles.cardContainer}>
            <View style={styles.cardHeader}>
                <Text style={styles.eventType}>{this.props.eventType}</Text>
                <Text style={styles.eventDate}>{this.props.eventDate}</Text>
            </View>
            <Text style={styles.eventName}>{this.props.eventName}</Text>
            <Text style={styles.eventDescription}>{this.props.eventDescription}</Text>
            <Text style={styles.eventLocal}>{this.props.eventLocal}</Text>
         </View>
      );
    }
  }

const styles = StyleSheet.create({
    cardContainer:{
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: '#FFF',
      width: windowWidth*.92,
      height: "auto",
      minHeight: windowHeight*.15,
      marginTop: "3%",
      borderRadius: 7,
      overflow: "hidden",
    },

    cardHeader:{
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#FD3155",
      paddingHorizontal: "3%",
      paddingVertical:"1.8%",
    },

    eventType:{
        fontSize: RFValue(18),
        fontFamily: "Sofia-Bold",
        color: "#FFF",
    },

    eventDate:{
        fontSize: RFValue(17),
        fontFamily: "Sofia-Medium",
        color: "#FFF",
    },

    eventName:{
      fontSize: RFValue(18),
      fontFamily: "Sofia-Medium",
      color: "#000000",
      padding: "2%",
    },
    
    eventLocal:{
      fontSize: RFValue(17),
      fontFamily: "Sofia-Regular",
      color: "#FF5A7B",
      paddingHorizontal: "2%",
      paddingVertical: "1%",
    },

    eventDescription:{
      fontSize: RFValue(17),
      fontFamily: "Sofia-Regular",
      padding: "2%",
  },
});
  