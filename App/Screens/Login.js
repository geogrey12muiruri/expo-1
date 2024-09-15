import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Onboarding 
      containerStyles={{paddingHorizontal:15}}
        onSkip={() => navigation.navigate('Home')}
        onDone={() => navigation.navigate('Home')}
        pages={[
          {
            backgroundColor: '#a6e4d0',
            image: (
              <View>
                <Text>Medplus Supat</Text>
              </View>
            ),
            title: 'Bridging Health',
            subtitle: 'Your Next Appointment is just a click away',
          },
          {
            backgroundColor: '#a6e4d0',
            image: (
              <View>
                <Text>Medplus Supat</Text>
              </View>
            ),
            title: 'Engage',
            subtitle: 'What is your health concern? Welcome to Our Community',
          },
            {
                backgroundColor: '#a6e4d0',
                image: (
                <View>
                    <Text>Medplus Supat</Text>
                </View>
                ),
                title: 'Learn',
                subtitle: 'We let you take control of your health', 
            },
          {
            backgroundColor: '#a6e4d0',
            image: (
              <View>
                <Text>Medplus Supat</Text>
              </View>
            ),
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});