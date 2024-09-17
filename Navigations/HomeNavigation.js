import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../App/Screens/Home';
import ClinicDoctorsList from '../App/Screens/ClinicDoctorsList';
import BookAppointement from '../App/Screens/BookAppointement';
import HospitalDetails from '../App/Screens/HospitalDetails';
import OnboardingScreen from '../App/Screens/OnboardingScreen';
import Login from '../App/Screens/LoginScreen';

const Stack = createStackNavigator();

export default function HomeNavigation() {
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

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isOnboardingComplete ? (
        <>
         
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="clinic-doctors-list" component={ClinicDoctorsList} />
          <Stack.Screen name="book-appointment" component={BookAppointement} />
          <Stack.Screen name="hospital-details" component={HospitalDetails} />
        </>
      ) : (
        <Stack.Screen name="onboarding" component={() => <OnboardingScreen onComplete={handleOnboardingComplete} />} />
      )}
    </Stack.Navigator>
  );
}