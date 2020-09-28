import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

//      Pages     \\
import Feed from './pages/feed';
import Login from './pages/login';

const StackPages = createStackNavigator(); 
const Tab = createBottomTabNavigator(); //BottomTabs

export function RouteLogin(){
    return(
        //Allow navigation between pages.
        <NavigationContainer >
            <StackPages.Navigator initialRouteName={"Login"}>
            <StackPages.Screen
                    options={{
                        headerShown: false
                    }}
                    name="Login" component={Login}
                />
                <StackPages.Screen 
                    options={{
                        headerShown: false
                    }}
                    name="Feed" component={RouteFeed}
                />
            </StackPages.Navigator>
        </NavigationContainer>
    );
}

export function RouteFeed(){
    return(
        <Tab.Navigator 
        screenOptions={({ route }) => ({
            tabBarIcon: ({color, size }) => {
              let iconName;
  
              if (route.name === 'Eventos') 
                iconName = "home"
              else if (route.name === 'Inscritos')
                iconName = "clipboard"
              else if(route.name === "Mapa")  
                iconName= "map"
              
              // You can return any component that you like here!
              return <Feather name={iconName} size={20} color={"#FFF"} />;
            },
          })}
        tabBarOptions={{
            activeTintColor: 'white',
            inactiveTintColor: 'white',
            style: {backgroundColor: '#FD3155', 
                    height: "8%", 
                    paddingHorizontal: "1%",
                    paddingBottom: "0.8%",},
            labelStyle: {
                fontSize: 12,
            },
            showIcon: true,
          }}>
            <Tab.Screen name="Eventos" component={Feed} />
            <Tab.Screen name="Inscritos" component={Login} />
            <Tab.Screen name="Mapa" component={Login} />
        </Tab.Navigator>
    );
}




