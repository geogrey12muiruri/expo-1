import * as SecureStore from 'expo-secure-store';
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ClerkProvider, ClerkLoaded, SignedIn, SignedOut } from "@clerk/clerk-expo";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './App/Screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './Navigations/TabNavigation';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import OnboardingScreen from './App/Screens/OnboardingScreen';

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

  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const status = await AsyncStorage.getItem('onboardingComplete');
      setIsOnboardingComplete(status === 'true');
      setIsLoading(false);
    };

    checkOnboardingStatus();
  }, []);

  const handleOnboardingComplete = async () => {
    await AsyncStorage.setItem('onboardingComplete', 'true');
    setIsOnboardingComplete(true);
  };

  if (!fontsLoaded || isLoading) {
    return <></>;
  }

  return (
    <ClerkProvider publishableKey={"pk_test_bmV4dC10ZXJyYXBpbi03OS5jbGVyay5hY2NvdW50cy5kZXYk"}>
      <ClerkLoaded>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <StatusBar hidden />
            <NavigationContainer>
              <SignedIn>
                {isOnboardingComplete ? (
                  <TabNavigation />
                ) : (
                  <OnboardingScreen onComplete={handleOnboardingComplete} />
                )}
              </SignedIn>
              <SignedOut>
                <Login />
              </SignedOut>
            </NavigationContainer>
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
    justifyContent: "center",
  },
});