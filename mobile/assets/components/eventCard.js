import React from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';


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
            <Text style={styles.eventDescription}>{this.props.eventName}</Text>
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
        fontSize: 14,
        fontFamily: "OpenSans-SemiBold",
        color: "#FFF",
    },
    eventDate:{
        fontSize: 14,
        fontFamily: "OpenSans-Regular",
        color: "#FFF",
    },
    eventDescription:{
      fontSize: 14,
      fontFamily: "OpenSans-Regular",
      color: "#000000",
      padding: "2%",

    },
    eventLocal:{
      fontSize: 14,
      fontFamily: "OpenSans-SemiBold",
      color: "#FF5A7B",
      paddingHorizontal: "2%",
      paddingVertical: "1%",
    }
});
  