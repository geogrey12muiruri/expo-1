import * as SecureStore from 'expo-secure-store';
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { ClerkProvider, ClerkLoaded, SignedIn, SignedOut } from "@clerk/clerk-expo";

import Login from './App/Screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './Navigations/TabNavigation';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';

const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log('No values stored under key: ' + key);
      }
      return item;
    } catch (error) {
      console.error('SecureStore get item error: ', error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function Index() {
  const [fontsLoaded, error] = useFonts({
    'Inter-Black': require('./assets/fonts/Inter_18pt-Regular.ttf'),
    'Inter-Black-Bold': require('./assets/fonts/Inter_18pt-Bold.ttf'),
    'Inter-Black-Semi': require('./assets/fonts/Inter_18pt-SemiBold.ttf')
  });

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <ClerkProvider publishableKey={"pk_test_bmV4dC10ZXJyYXBpbi03OS5jbGVyay5hY2NvdW50cy5kZXYk"}>
      <ClerkLoaded>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <StatusBar hidden />
            <SignedIn>
            <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
             
            </SignedIn>
            <SignedOut>
              <Login />
            </SignedOut>
            <Toast />
          </SafeAreaView>
        </SafeAreaProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});