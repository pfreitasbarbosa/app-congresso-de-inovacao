import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';

//      Pages     \\
import Feed from './pages/feed';

const StackPages = createStackNavigator(); //StackNavigator
const BottomTab = createBottomTabNavigator(); //BottomTabs

export default function Routes(){
    return(
        //Allow navigation between pages.
        <NavigationContainer>
            {/* Pages that use stack navigation */}
            <StackPages.Navigator>
                <StackPages.Screen
                    options={{
                        headerShown: false
                    }}
                    name="feed" component={Feed}
                />
            </StackPages.Navigator>
            {/* To use bottom tabs we need some screens first. */}
        </NavigationContainer>
    );
}