import {View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react'

//Persistent data with AsyncStorage
import AsyncStorage from '@react-native-community/async-storage';

import globalStyles from '../../../globalStyles'
import styles from '../feed/styles'
import SearchBar from '../../../assets/components/searchBar'
import EventCard from '../../../assets/components/eventCard'
import moment from "moment";

export default class Feed extends React.Component {
  constructor(props){
    super(props);
    this.navigateToLogin = this.navigateToLogin.bind(this)
    this.clearAsync = this.clearAsync.bind(this)
    this.state = {
        userName: "KIRBY",
        courseName: "Ciência da Computação",
    }
  }

  clearAsync(){
    AsyncStorage.clear()
    this.navigateToLogin()
  }

  navigateToLogin(){
    this.props.navigation.navigate('Login', { screen: 'Login' });
  }
  
  render(){
    return(
      <View style = {globalStyles.container}>
        <SearchBar
          userName={this.state.userName}
          courseName={this.state.courseName}
          logoutFunction={this.clearAsync}
        ></SearchBar>
        <View style={styles.eventsContainer}>
          <FlatList
            contentContainerStyle={styles.cardContainer}
            data={this.props.route.params.info}
            renderItem={({ item }) => (
              <EventCard
                eventType={item.type}
                eventDate={moment(item.start_time).format('DD/MM/YYYY h:mm')}
                eventName={item.name}
                eventDescription={item.description}
                eventLocal={item.location}>
              </EventCard>
            )}
          />
        </View>
      </View>
    );
  }
}
