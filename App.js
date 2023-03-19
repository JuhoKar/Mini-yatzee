import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Home from './Components/Home';
import Gameboard from './Components/Gameboard';
import Scoreboard from './Components/Scoreboard';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from './Style/Styles';


const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home}
         options={{tabBarStyle: {display: "none"}}}/>
        <Tab.Screen name="Gameboard" component={Gameboard} />
        <Tab.Screen name="Scoreboard" component={Scoreboard} /> 
      </Tab.Navigator>
    </NavigationContainer>
  );
}


