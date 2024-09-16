import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { FlatList } from 'react-native';
import ClinicCardItem from '../common/ClinicCardItem';
import { useNavigation } from '@react-navigation/native';

export default function ClinicListBig({ clinicDoctorsList }) {
  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 15 }}>
      <FlatList
        data={clinicDoctorsList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('hospital-details', { clinic: item })}
          >
            <ClinicCardItem clinic={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}