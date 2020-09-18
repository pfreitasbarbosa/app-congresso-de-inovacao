import React from 'react'
import {View,Text,TouchableOpacity,
        SafeAreaView, Image, TextInput} from 'react-native';

import logo from '../../../assets/feilogo.png'
import globalStyles from '../../../globalStyles'
import styles from '../login/styles';


export default class Login extends React.Component {
  constructor(props){
    super();
    this.navigateToFeed = this.navigateToFeed.bind(this);
  }

  navigateToFeed(){
    this.props.navigation.navigate('Loading');
  }

  render(){
    return(
      <SafeAreaView style = {globalStyles.container}>
        <View>
          <Image 
            style={styles.logoStyle}
            source={logo}/>
          <View style={styles.formStyle}>
            <Text style={styles.inputHeader}>Usuário</Text>
            <TextInput style={[styles.inputStyle,{fontFamily: 'Sofia-Light'}]}/>
            <Text style={styles.inputHeader}>Senha</Text>
            <TextInput 
            style={[styles.inputStyle,{fontFamily: 'Sofia-Bold'}]}
            secureTextEntry={true}/>
            <TouchableOpacity 
            style={styles.confirmButton}
            onPress={this.navigateToFeed}>
              <Text style={{color: '#FFF', fontWeight: 'bold'}}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
