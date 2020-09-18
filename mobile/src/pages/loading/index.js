import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';


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
            <SafeAreaView>
                <View>
                    <Text>CARREGANDO</Text>
                </View>
            </SafeAreaView>
        );
                
    }
}

export default Loading;