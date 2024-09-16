import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen({ onComplete }) {
  const [currentPage, setCurrentPage] = useState(0);
  
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} scrollEnabled={false} pinchGestureEnabled={false}>
      <Onboarding 
        pages={[
          {
            backgroundColor: '#a7f3d0',
            image: (
              <View style={styles.page}>
                <LottieView source={require('../../assets/animations/animation01.json')} autoPlay loop style={styles.lottie} />
                <Text style={styles.title}>Medplus Supat</Text>
                <Text style={styles.subtitle}>Your Next Appointment is just a click away</Text>
              </View>
            ),
            title: '',
            subtitle: '',
          },
          {
            backgroundColor: '#fef3c7',
            image: (
              <View style={styles.page}>
                <LottieView source={require('../../assets/animations/animation02.json')} autoPlay loop style={styles.lottie} />
                <Text style={styles.title}>We are Professionals</Text>
                <Text style={styles.subtitle}>Your Health Care is our Top concern. Signup to begin Consultations.</Text>
              </View>
            ),
            title: '',
            subtitle: '',
          },
          {
            backgroundColor: '#a78bfa',
            image: (
              <View style={styles.page}>
                <LottieView source={require('../../assets/animations/animation05.json')} autoPlay loop style={styles.lottie} />
                <Text style={styles.title}>Find Out? 🤔</Text>
                <Text style={styles.subtitle}>Have a health concern? Join Our Community Today</Text>
              </View>
            ),
            title: '',
            subtitle: '',
          },
          {
            backgroundColor: '#a6e4d0',
            image: (
              <View style={styles.page}>
                <LottieView source={require('../../assets/animations/animation03.json')} autoPlay loop style={styles.lottie} />
                <Text style={styles.title}>Register as a Clinic</Text>
                <Text style={styles.subtitle}>We Let You be in Control with flexible scheduling and synchronized data management system</Text>
              </View>
            ),
            title: '',
            subtitle: '',
          },
          {
            backgroundColor: '#fff',
            image: (
              <View style={styles.page}>
                <View style={styles.topImageContainer}>
                  <Image source={require('../../assets/topVector.png')} style={styles.topImage} />
                </View>
                <View style={styles.helloContainer}>
                  <Text style={styles.helloText}>Hello</Text>
                </View>
                <View>
                  <Text style={styles.signInText}>Sign in to your account</Text>
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={() => {
                  onComplete();
                  navigation.navigate('Login');
                }}>
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
              </View>
            ),
            title: '',
            subtitle: '',
          },
        ]}
        bottomBarHighlight={false}
        showDone={false}
        showNext={true}
        showSkip={true}
        onIndexChange={(index) => setCurrentPage(index)}
        nextLabel="Next"
        skipLabel="Skip"
        onSkip={() => setCurrentPage(4)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  lottie: {
    width: '100%',
    height: 'auto',
    aspectRatio: 1, // Maintain aspect ratio
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  getStartedButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  getStartedButton: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  getStartedButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  topImageContainer: {},
  topImage: {
    width: '100%',
    height: 130,
  },
  helloContainer: {},
  helloText: {
    textAlign: 'center',
    fontSize: 70,
    fontWeight: '500',
    color: '#262626',
  },
  signInText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#262626',
  },
  loginButton: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});