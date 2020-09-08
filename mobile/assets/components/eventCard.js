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
            <Text style={styles.eventDate}>{this.props.eventName}</Text>
            <Text style={styles.eventLocal}>{this.props.eventLocal}</Text>
         </View>
    );
  }
}

const styles = StyleSheet.create({
    cardContainer:{
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: '#F8F8F8',
        width: windowWidth*.92,
        height: windowHeight*.15,
        padding: "3%",
        marginTop: "3%",
        borderRadius: 4,
      },
    cardHeader:{
        flexDirection: "row",
        justifyContent: "space-between",
    },
    eventType:{
        fontSize: 14,
        fontFamily: "OpenSans-SemiBold",
        color: "#101838",
    },
    eventDate:{
        fontSize: 14,
        fontFamily: "OpenSans-Regular",
        color: "#000000",
    },
    eventLocal:{
        fontSize: 14,
        fontFamily: "OpenSans-SemiBold",
        color: "#EF0432",
    }
});
  