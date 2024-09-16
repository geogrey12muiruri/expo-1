import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import HospitalAppointementInfo from '../Components/BookAppointement/HospitalAppointementInfo';
import HorizontalLine from '../Components/common/HorizontalLine';
import BookingSection from '../Components/BookAppointement/BookingSection';
import ActionButton from '../Components/common/ActionButton';

const BookAppointement = () => {
  const route = useRoute();
  const { clinic } = route.params; // Extract clinic data from route params

  return (
    <ScrollView style={{ padding: 20 }}>
      <HospitalAppointementInfo clinic={clinic} /> {/* Pass clinic data */}
      <ActionButton />
      <HorizontalLine />
      <BookingSection clinic={clinic} /> {/* Pass clinic data */}
    </ScrollView>
  );
}

export default BookAppointement;