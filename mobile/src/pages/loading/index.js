import React, { Component } from "react";
import { View, Image} from 'react-native';

//Loading animation
import LottieView from 'lottie-react-native';
import lottieAnimation from "../../../assets/components/loading.json"; 

//Persistent data with AsyncStorage
import AsyncStorage from '@react-native-community/async-storage';

//Backend Integration
import api from '../../axiosConfig.js';

//Style and images
import globalStyles from "../../../globalStyles";
import FeiLogo from "../../../assets/feilogo.png";
import styles from "../loading/styles";

export default class Loading extends Component{
    constructor(props){
        super()
        this.state = {
            token: '',
          }
        this.getUserToken = this.getUserToken.bind(this);
        this.navigateToFeed = this.navigateToFeed.bind(this);
        this.getUserToken();
    }  

    navigateToFeed(res){
        this.props.navigation.navigate('Feed', { screen: 'Eventos', params: {info: res}});
    }

    getUserToken = async() =>{
        try{
            const userToken = await AsyncStorage.getItem('@UserToken');
            if(userToken != null){ //User already been authenticated and have a token
                this.setState({token: userToken})
                this.getFeedEvents()
                this.navigateToFeed();
            }
        } catch(e){
            console.log(e);
        }
    }
    
    getFeedEvents = async()=>{
        try{
            const res = await api.get('/events', {
                headers: {
                    'Authorization': `Bearer ${this.state.token}`
                }
            });
            this.navigateToFeed(res.data)
        } catch(e){
            console.log(e.request);
        }
    }

   render(){
        return(
            <View style={[globalStyles.container]}>
                <Image
                source={FeiLogo}
                style={styles.logoStyle}
                />
                <LottieView source={lottieAnimation} autoPlay loop/>
            </View>
        );
    }
}
