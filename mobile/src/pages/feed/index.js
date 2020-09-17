import {View, FlatList} from 'react-native';
import React from 'react'

import globalStyles from '../../../globalStyles'
import styles from '../feed/styles'
import SearchBar from '../../../assets/components/searchBar'
import EventCard from '../../../assets/components/eventCard'

export default class Feed extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        eventData: [
          {
            eventType: "Palestra",
            eventDate: "16/10 - 10:00",
            eventName: "Revolução da IA, Mudanças no mundo",
            eventLocal: "Auditório Principal - Prédio A",
          },
          {
            eventType: "Palestra 1",
            eventDate: "16/10 - 10:00",
            eventName: "Revolução da IA, Mudanças no mundo",
            eventLocal: "Auditório Principal - Prédio A",
          },
          {
            eventType: "Palestra 2",
            eventDate: "16/10 - 10:00",
            eventName: "Revolução da IA, Mudanças no mundo",
            eventLocal: "Auditório Principal - Prédio A",
          },
          {
            eventType: "Palestra 3",
            eventDate: "16/10 - 10:00",
            eventName: "Revolução da IA, Mudanças no mundo",
            eventLocal: "Auditório Principal - Prédio A",
          },
          {
            eventType: "Palestra 4",
            eventDate: "16/10 - 10:00",
            eventName: "Revolução da IA, Mudanças no mundo",
            eventLocal: "Auditório Principal - Prédio A",
          },
          {
            eventType: "Palestra 5",
            eventDate: "16/10 - 10:00",
            eventName: "Revolução da IA, Mudanças no mundo",
            eventLocal: "Auditório Principal - Prédio A",
          },
          {
            eventType: "Palestra 6",
            eventDate: "16/10 - 10:00",
            eventName: "Revolução da IA, Mudanças no mundo",
            eventLocal: "Auditório Principal - Prédio A",
          },
        ]
    }
  }

  
  render(){
    return(
      <View style = {globalStyles.container}>
        <SearchBar></SearchBar>
        <View style={styles.eventsContainer}>
          <FlatList
            contentContainerStyle={styles.cardContainer}
            data={this.state.eventData}
            //data defined in constructor
            renderItem={({ item }) => (
              // Single Comes here which will be repeatative for the FlatListItems
              <EventCard
                eventType={item.eventType}
                eventDate={item.eventDate}
                eventName={item.eventName}
                eventLocal={item.eventLocal}>
              </EventCard>
            )}
          />
        </View>
      </View>
    );
  }
}
