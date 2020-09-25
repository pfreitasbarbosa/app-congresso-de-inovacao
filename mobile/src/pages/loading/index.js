import React from 'react';
import { View, Text, SafeAreaView,
         Image } from 'react-native';

import globalStyles from '../../../globalStyles';
import styles from '../loading/styles';
import logo from '../../../assets/feilogo.png';

import CircularProgress from '../../../assets/components/circularProgress';

class Loading extends React.Component {
    constructor(props) {
        super();
        this.state = {
            tempo:false
        }
        this.navigateToFeed = this.navigateToFeed.bind(this);
    }  

    navigateToFeed(){
        this.props.navigation.navigate('Feed', { screen: 'Feed' });
    }

    componentDidMount(){
        this.timeoutHandle = setTimeout(()=>{
            this.navigateToFeed()
        }, 5000);
   }

   componentWillUnmount(){
        clearTimeout(this.timeoutHandle); 
   }

    render() {
        return (
            <SafeAreaView style={globalStyles.container}>
                <View style={styles.container}>
                    <Image 
                    style={styles.logoStyle}
                    source={logo}/>
                    <CircularProgress/>
                </View>
            </SafeAreaView>
        );
                
    }
}



export default Loading;