import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native-web'
import Login from './App/Screens/Login'

export default function App() {
  return (
    <View>
     <Login />
    </View>
  )
}

const styles= StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#fff"
  }
})