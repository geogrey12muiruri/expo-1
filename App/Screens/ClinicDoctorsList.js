import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import SharedHeader from '../Components/Shared/SharedHeader'
import ClinicDoctorTab from '../Components/clinicdoctorsscreen/ClinicDoctorTab';
import ClinicListBig from '../Components/clinicdoctorsscreen/ClinicListBig';
import DoctorList from '../Components/clinicdoctorsscreen/DoctorList'; // Import DoctorList component
import Colors from '../Components/Shared/Colors';
import GlobalApi from '../../Services/GlobalApi';



export default function ClinicDoctorsList() {
  const [clinicDoctorsList, setClinicDoctorsList] = useState([]);
  const [doctorList, setDoctorList] = useState([]); // State for doctors
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Clinics');
  const param = useRoute().params || {};

  useEffect(() => {
    if (activeTab === 'Clinics') {
      getClinicsByCategory();
    } else {
      getDoctorsByCategory();
    }
  }, [activeTab]);

  const getClinicsByCategory = () => {
    setIsLoading(true);
    GlobalApi.getClinicsByCategory(param?.categoryName || '')
      .then(resp => {
        setClinicDoctorsList(resp.data.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getDoctorsByCategory = () => {
    setIsLoading(true);
    GlobalApi.getDoctorsByCategory(param?.categoryName || '')
      .then(resp => {
        setDoctorList(resp.data.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View style={{ padding: 20 }}>
      <SharedHeader title={param?.categoryName} />
      <ClinicDoctorTab activeTab={(value) => setActiveTab(value)} />
      {isLoading ? (
        <ActivityIndicator size={'large'} color={Colors.PRIMARY} style={{ marginTop: '50%'}} />
      ) : (
        <>
          {activeTab === 'Clinics' ? (
            <ClinicListBig clinicDoctorsList={clinicDoctorsList} />
          ) : (
            <DoctorList doctorList={doctorList} />
          )}
        </>
      )}
    </View>
  );
}