import React from 'react'
import {View,Text,TouchableOpacity,
        SafeAreaView, Image, TextInput} from 'react-native';
import Toast from 'react-native-tiny-toast';

//Backend integration and persistent data
import api from '../../axiosConfig.js';
import AsyncStorage from '@react-native-community/async-storage';

//Styles and images
import logo from '../../../assets/feilogo.png'
import globalStyles from '../../../globalStyles'
import styles from '../login/styles';

export default class Login extends React.Component {
  constructor(props){
    super();
    this.state = {
      user: '',
      pass: ''
    }
    this.authenticateUser = this.authenticateUser.bind(this);
    this.saveUserToken = this.saveUserToken.bind(this);
    this.navigateToFeed = this.navigateToFeed.bind(this);
  }

  navigateToFeed(){
    this.props.navigation.navigate('Loading');
  }

  /**
   * Method to save the user token on asyncStorage.
   * @param {string} token: Token acquired by backend after api.post.
   */
  saveUserToken = async(token) =>{
    try{
      await AsyncStorage.setItem('@UserToken',token);
      Toast.show('Usuário autenticado.\n\tEntrando...',{
        duration: Toast.duration.SHORT,
        containerStyle: {backgroundColor: '#0d852b'},
        textStyle: {color: '#FFF', fontFamily: 'Sofia-Bold'},
      });
      this.navigateToFeed();
    }
    catch(e){
      Toast.show('Erro ao autenticar usuário.',{
        duration: Toast.duration.SHORT,
        containerStyle: {backgroundColor: '#f74040'},
        textStyle: {color: '#FFF', fontFamily: 'Sofia-Bold'}
      })
    }
  }

  /**
   * Method to receive info from backend and authenticate (or not) the user.
   */
  authenticateUser = async() =>{
    if(this.state.user != "" && this.state.pass != ""){
      try{
        const res = await api.post('/sessions',{
          "username": this.state.user,
          "password": this.state.pass
        });
        this.saveUserToken(res.data.token);
      }
      catch(error){
        //Incorrect combination of user/password (400 bad request)
        if(error.response.status == "400"){
          Toast.show('Usuário ou senha inválidas.\n\tTente novamente.',{
            duration: Toast.duration.LONG,
            containerStyle: {backgroundColor: '#f74040'},
            textStyle: {color: '#FFF', fontFamily: 'Sofia-Bold'},
          })
        }
        //Error in server connection (wrong path/wrong IP)
        else{
          Toast.show('Erro ao conectar com o sevidor\nTente novamente mais tarde.',{
            duration: Toast.duration.LONG,
            containerStyle: {backgroundColor: '#f74040'},
            textStyle: {color: '#FFF', fontFamily: 'Sofia-Bold'},
          })
        }
      }
    }
    //User doesn't inserted name and/or password.
    else
    {
      Toast.show('Por favor, preencha todos os campos.',{
        duration: Toast.duration.LONG,
        containerStyle: {backgroundColor: '#f0d841'},
        textStyle: {color: 'black', fontFamily: 'Sofia-Bold'},
      })
    }
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
            <TextInput 
            style={[styles.inputStyle,{fontFamily: 'Sofia-Light'}]}
            onChangeText={text => this.setState({user: text})}/>
            <Text style={styles.inputHeader}>Senha</Text>
            <TextInput 
            style={[styles.inputStyle,{fontFamily: 'Sofia-Bold'}]}
            secureTextEntry={true}
            onChangeText={text => this.setState({pass: text})}/>
            <TouchableOpacity 
            style={styles.confirmButton}
            onPress={this.authenticateUser}>
              <Text style={{color: '#FFF', fontWeight: 'bold'}}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}