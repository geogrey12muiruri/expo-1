import { View, Text } from 'react-native'
import React from 'react'



import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeNavigation from '../Navigations/HomeNavigation'
import Appointment from '../App/Screens/Appointment';
import Explore from '../App/Screens/Explore';
import Profile from '../App/Screens/Profile';
const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false,
    }}>
        <Tab.Screen name="Home" component={HomeNavigation} 
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen name="Explore" component={Explore}
        options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => (
                <Ionicons name="search-outline" size={24} color="black" />
            ),
        }} />
          <Tab.Screen name="Profile" component={Profile}
        options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
        }} />
        
        <Tab.Screen name="Appointment" component={Appointment} 
            options={{
                tabBarLabel: 'Appointment',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="calendar" color={color} size={size} />
                ),
            }}
        />
    </Tab.Navigator>

  )
}