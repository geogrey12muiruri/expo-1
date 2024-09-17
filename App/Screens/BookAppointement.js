import React from 'react';
import { View, Text} from 'react-native';
import { useRoute } from '@react-navigation/native';
import HospitalAppointementInfo from '../Components/BookAppointement/HospitalAppointementInfo';
import HorizontalLine from '../Components/common/HorizontalLine';
import BookingSection from '../Components/BookAppointement/BookingSection';
import ActionButton from '../Components/common/ActionButton';
import { ScrollView } from 'react-native-gesture-handler';
const BookAppointement = () => {
  const route = useRoute();
  const { clinic } = route.params; // Extract clinic data from route params

  return (
    <ScrollView style={{ padding: 20 }}>
      <HospitalAppointementInfo clinic={clinic} />
      <BookingSection clinic={clinic} /> 
      <ActionButton />
      <HorizontalLine />
 
    </ScrollView>
  );
}

export default BookAppointement;