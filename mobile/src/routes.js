import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

//      Pages     \\
import Feed from './pages/feed';
import Login from './pages/login';
import Loading from './pages/loading';

const StackPages = createStackNavigator(); 
const Tab = createBottomTabNavigator(); //BottomTabs


let usrToken = null;
//Async function to check if user already login once.
loadAccessToken = async () => {
    const token = await AsyncStorage.getItem('@UserToken');;
    usrToken = token;
}
loadAccessToken();


export function RouteLogin(){
    console.log(usrToken);
    return(
        //Allow navigation between pages.
        <NavigationContainer >
            <StackPages.Navigator initialRouteName={(usrToken!=null)?"Loading":"Login"}>
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
                    name="Loading" component={Loading}
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
              return <Feather name={iconName} size={20} color={"#F8F8F8"} />;
            },
          })}
        tabBarOptions={{
            activeTintColor: 'white',
            inactiveTintColor: 'white',
            style: {backgroundColor: '#FF2C55', 
                    height: "8%", 
                    paddingHorizontal: "1%",
                    paddingBottom: "0.8%"},
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




