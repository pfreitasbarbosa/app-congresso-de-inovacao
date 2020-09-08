import {View, ScrollView} from 'react-native';
import React from 'react'

import globalStyles from '../../../globalStyles'
import styles from '../feed/styles'
import SearchBar from '../../../assets/components/searchBar'
import EventCard from '../../../assets/components/eventCard'

export default class Feed extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <View style = {globalStyles.container}>
        <SearchBar></SearchBar>
        <ScrollView>
          <View style={styles.eventsContainer}>
          <EventCard 
              eventType="Palestra"
              eventDate="16/10 - 10:00"
              eventName="Revolução da IA, Mudanças no mundo"
              eventLocal="Auditório Principal - Prédio A"
          ></EventCard>
          <EventCard 
              eventType="Palestra"
              eventDate="16/10 - 10:00"
              eventName="Revolução da IA, Mudanças no mundo"
              eventLocal="Auditório Principal - Prédio A"
          ></EventCard>
          <EventCard 
              eventType="Palestra"
              eventDate="16/10 - 10:00"
              eventName="Revolução da IA, Mudanças no mundo"
              eventLocal="Auditório Principal - Prédio A"
          ></EventCard>
          <EventCard 
              eventType="Palestra"
              eventDate="16/10 - 10:00"
              eventName="Revolução da IA, Mudanças no mundo"
              eventLocal="Auditório Principal - Prédio A"
          ></EventCard>
          <EventCard 
              eventType="Palestra"
              eventDate="16/10 - 10:00"
              eventName="Revolução da IA, Mudanças no mundo"
              eventLocal="Auditório Principal - Prédio A"
          ></EventCard>
          <EventCard 
              eventType="Palestra"
              eventDate="16/10 - 10:00"
              eventName="Revolução da IA, Mudanças no mundo"
              eventLocal="Auditório Principal - Prédio A"
          ></EventCard>
          </View>
        </ScrollView>
      </View>
    );
  }
}
