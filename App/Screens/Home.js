import { View, Text, Button, ScrollView } from 'react-native';
import React from 'react';
import { useAuth } from '@clerk/clerk-expo';
import Header from '../Components/home/Header';
import SearchBar from '../Components/home/SearchBar';
import Slider from '../Components/Slider';
import Category from '../Components/home/Category';
import Clinics from '../Components/home/Clinics';
import Colors from '../Components/Shared/Colors';

export default function Home() {
  const { isLoaded, signOut } = useAuth();

  return (
    <ScrollView style={{ padding: 20, marginTop: 25, backgroundColor: Colors.GRAY }}>
      <Header />
      <SearchBar />
      <Slider />
      <Category />
      <Clinics />
 
    </ScrollView>
  );
}