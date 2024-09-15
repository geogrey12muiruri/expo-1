import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingScreen({ navigation }) {
  const handleGetStarted = async () => {
    await AsyncStorage.setItem('onboardingCompleted', 'true');
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text>OnboardingScreen</Text>
      <Button title="Get Started" onPress={handleGetStarted} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});