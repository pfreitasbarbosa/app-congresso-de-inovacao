import React, { Component } from "react";
import { View, Image} from 'react-native';

//Loading animation
import LottieView from 'lottie-react-native';
import lottieAnimation from "../../../assets/components/loading.json"; 

//Persistent data with AsyncStorage
import AsyncStorage from '@react-native-community/async-storage';

//Style and images
import globalStyles from "../../../globalStyles";
import FeiLogo from "../../../assets/feilogo.png";
import styles from "../loading/styles";

export default class Loading extends Component{
    constructor(props){
        super()
        this.getUserToken = this.getUserToken.bind(this);
        this.navigateToFeed = this.navigateToFeed.bind(this);
        this.getUserToken();
    }  

    navigateToFeed(){
        this.props.navigation.navigate('Feed', { screen: 'Feed' });
    }

    getUserToken = async() =>{
        try{
            const userToken = await AsyncStorage.getItem('@UserToken');
            if(userToken != null){ //User already been authenticated and have a token
                this.navigateToFeed();
            }
        } catch(e){
            console.log(e);
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
