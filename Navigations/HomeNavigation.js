import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from '../App/Screens/Home';
import ClinicDoctorsList from '../App/Screens/ClinicDoctorsList';
import BookAppointement from '../App/Screens/BookAppointement';
import HospitalDetails from '../App/Screens/HospitalDetails';
// import ClinicDoctorsList from '../screens/ClinicDoctorsList';
// import BookAppointement from '../screens/BookAppointement';
// import HospitalDetails from '../screens/HospitalDetails';
// import Home from '../screens/Home';

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="clinic-doctors-list" component={ClinicDoctorsList} />
      <Stack.Screen name="book-appointment" component={BookAppointement} />
      <Stack.Screen name="hospital-details" component={HospitalDetails} />
    </Stack.Navigator>
  );
}