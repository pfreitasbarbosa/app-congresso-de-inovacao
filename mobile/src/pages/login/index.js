import {View,Text,TouchableOpacity} from 'react-native';
import React from 'react'

import globalStyles from '../../../globalStyles'


export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.navigateToFeed = this.navigateToFeed.bind(this);
  }

  navigateToFeed(){
    this.props.navigation.navigate('Feed', { screen: 'Feed' });
  }

  render(){
    return(
      <View style = {globalStyles.container}>
        <TouchableOpacity onPress={this.navigateToFeed}>
            <Text>Pora</Text>
        </TouchableOpacity>
      </View>
    );
  }
}