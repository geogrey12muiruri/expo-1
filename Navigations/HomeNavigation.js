import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../App/Screens/Home';
import ClinicDoctorsList from '../App/Screens/ClinicDoctorsList';
import BookAppointement from '../App/Screens/BookAppointement';
import HospitalDetails from '../App/Screens/HospitalDetails';
import OnboardingScreen from '../App/Screens/OnboardingScreen';

const Stack = createStackNavigator();

export default function HomeNavigation() {
  const [initialRoute, setInitialRoute] = useState('Onboarding');

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const status = await AsyncStorage.getItem('onboardingCompleted');
      if (status === 'true') {
        setInitialRoute('Home');
      }
    };

    checkOnboardingStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="clinic-doctors-list" component={ClinicDoctorsList} />
        <Stack.Screen name="book-appointment" component={BookAppointement} />
        <Stack.Screen name="hospital-details" component={HospitalDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}