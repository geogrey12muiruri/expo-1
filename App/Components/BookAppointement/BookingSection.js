import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native';
import SubHeading from '../home/SubHeading';
import moment from 'moment';
import { useUser } from '@clerk/clerk-expo';
import Toast from 'react-native-toast-message';
import Colors from '../Shared/Colors';
import globalApi from '../../../Services/GlobalApi';

const BookingSection = ({ clinic }) => {
  const [next7Days, setNext7Days] = useState([]);
  const [selectedDate, setSelectedDate] = useState(next7Days[0]?.date);
  const [timeList, setTimeList] = useState([]);
  const [selectedTime, setSelectedTime] = useState(next7Days[0]?.date);
  const [notes, setNotes] = useState('');
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getDays();
    getTime();
  }, []);

  const getDays = () => {
    const today = moment();
    const nextSevenDays = [];
    for (let i = 0; i < 7; i++) {
      const date = moment().add(i, 'days');
      nextSevenDays.push({
        date: date,
        day: date.format('ddd'), // Mon Tue
        formattedDate: date.format('Do MMM') // 1 Jan
      });
    }
    setNext7Days(nextSevenDays);
  };

  const getTime = () => {
    const timeList = [];
    for (let i = 7; i <= 11; i++) {
      timeList.push({
        time: i + ":00 AM"
      });
      timeList.push({
        time: i + ":30 AM"
      });
    }

    for (let i = 1; i <= 5; i++) {
      timeList.push({
        time: i + ":00 PM"
      });
      timeList.push({
        time: i + ":30 PM"
      });
    }
    setTimeList(timeList);
  };

  const handleBookAppointment = () => {
    // Perform validation
    if (!selectedDate || !selectedTime || !clinic.id || !notes) {
      Alert.alert('Error', 'Please fill in all the required fields.');
      return;
    }
    const fullName = `${user.firstName} ${user.lastName}`;

    setIsSubmitting(true);
    const data = {
      data: {
        UserName: fullName,
        Email: user.primaryEmailAddress.emailAddress,
        Date: selectedDate,
        Time: selectedTime,
        clinic: clinic.id,
        Note: notes,
      }
    };

    console.log('This Booked Appointment Data is sent to Strapi --> ', data);
    globalApi.createAppointement(data)
      .then(() => {
        console.log('🟢 Booked Data sent Successfully');
        Toast.show({
          type: 'success',
          text1: 'Appointment Booked',
          text2: 'Your appointment has been successfully booked.'
        });
      })
      .catch(error => {
        console.log('🔴Error while sending data to backend = ', error);
        Toast.show({
          type: 'error',
          text1: 'Booking Failed',
          text2: 'There was an error booking your appointment. Please try again.'
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <View>
      <Text style={{ fontSize: 18, color: Colors.gray, marginBottom: 10 }}>Book Appointment</Text>

      <SubHeading subHeadingTitle={'Day'} seeAll={false} />

      {/* Date */}
      <FlatList
        
        data={next7Days}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 15 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedDate(item.date)}
            style={[styles.dayButton, selectedDate == item.date ? { backgroundColor: Colors.primary } : null]}
          >
            <Text style={[{ fontFamily: 'Inter-Black' }, selectedDate == item.date ? { color: Colors.white } : null]}>
              {item.day}
            </Text>
            <Text style={[{ fontFamily: 'Inter-Black-Semi' }, selectedDate == item.date ? { color: Colors.white } : null]}>
              {item.formattedDate}
            </Text>
          </TouchableOpacity>
        )}
        
     
      />

      <SubHeading subHeadingTitle={'Time'} seeAll={false} />

      {/* Time */}
      <FlatList
        horizontal
        data={timeList}
        keyExtractor={(item) => item.time}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedTime(item.time)}
            style={[styles.dayButton, { paddingVertical: 16 }, selectedTime == item.time ? { backgroundColor: Colors.primary } : null]}
          >
            <Text style={[{ fontFamily: 'Inter-Black-Semi' }, selectedTime == item.time ? { color: Colors.white } : null]}>
              {item.time}
            </Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 15 }}
      />

      <SubHeading subHeadingTitle={'Note'} seeAll={false} />

      {/* Notes */}
      <TextInput
        onChangeText={(val) => setNotes(val)}
        numberOfLines={3}
        placeholder='Write Note Here'
        style={{ backgroundColor: Colors.ligh_gray, padding: 10, borderRadius: 10, borderColor: Colors.secondary, borderWidth: 1 }}
      />

      {/* Make Appointment Button */}
      <TouchableOpacity
        onPress={handleBookAppointment}
        disabled={isSubmitting}
        style={{ backgroundColor: Colors.primary, borderRadius: 99, padding: 13, margin: 10, left: 0, right: 0, marginBottom: 10, zIndex: 20 }}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color={Colors.white} />
        ) : (
          <Text style={{ fontSize: 20, textAlign: 'center', color: Colors.white, fontFamily: 'Inter-Black-Semi', fontSize: 17 }}>
            Make Appointment
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dayButton: {
    borderWidth: 1,
    borderRadius: 99,
    padding: 5,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginRight: 10,
    borderColor: Colors.gray
  },
});

export default BookingSection;