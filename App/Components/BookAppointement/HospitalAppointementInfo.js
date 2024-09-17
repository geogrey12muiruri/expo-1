import React from 'react';
import { View, Text, Image } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Colors from '../Shared/Colors';
import SharedHeader from '../common/SharedHeader';
import EvilIcons from '@expo/vector-icons/EvilIcons';

const HospitalAppointementInfo = ({ clinic }) => {
  // Check if clinic and clinic.attributes are defined
  if (!clinic || !clinic.attributes) {
    return (
      <View>
        <Text>Error: Clinic data is not available.</Text>
      </View>
    );
  }

  return (
    <View style={{ marginBottom: 15 }}>
      <SharedHeader title={'Book Appointment'} />

      <View style={{ flexDirection: 'row', gap: 15, marginTop: 10, alignItems: 'center' }}>
        {clinic.attributes.image && clinic.attributes.image.data && clinic.attributes.image.data.attributes && clinic.attributes.image.data.attributes.url ? (
          <Image
            source={{ uri: clinic.attributes.image.data.attributes.url }}
            style={{
              width: 100, height: 100, borderRadius: 99
            }}
          />
        ) : (
          <Text>Image not available</Text>
        )}

        {/* name - address */}
        <View>
          <Text style={{ fontFamily:'Inter-Black-Semi', fontSize: 20, marginBottom: 8 }}>{clinic.attributes.Name}</Text>
          {/* Address */}
          <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          <EvilIcons name="location" size={24} color="black" />
            <Text style={{ fontSize: 18, fontFamily: 'Inter-Black', color: Colors.gray, width: '80%' }}>
              {clinic.attributes.Address}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default HospitalAppointementInfo;