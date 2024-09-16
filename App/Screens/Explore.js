import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import ClinicDoctorTab from '../Components/clinicdoctorsscreen/ClinicDoctorTab';
import AllDoctorsList from '../Components/alldoctoslist/AllDoctorsList'; // Adjust the import path as needed
import ClinicListBig from '../Components/clinicdoctorsscreen/ClinicListBig';

import SharedHeader from '../Components/common/SharedHeader';
import Colors from '../Components/Shared/Colors';
import GlobalApi from '../../Services/GlobalApi';

export default function Explore() {
  const [clinicDoctorsList, setClinicDoctorsList] = useState([]);
  const [doctorList, setDoctorList] = useState([]); // State for doctors
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Clinics');

  useEffect(() => {
    if (activeTab === 'Clinics') {
      getAllClinics();
    } else {
      getAllDoctors();
    }
  }, [activeTab]);

  const getAllClinics = () => {
    setIsLoading(true);
    GlobalApi.getAllClinics()
      .then(resp => {
        setClinicDoctorsList(resp.data.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getAllDoctors = () => {
    setIsLoading(true);
    GlobalApi.getAllDoctors()
      .then(resp => {
        setDoctorList(resp.data.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View style={{ padding: 20 }}>
      <View style={{ position: 'absolute', margin: 15, zIndex: 10 }}>
          <SharedHeader title={''} />
        </View>

      <ClinicDoctorTab activeTab={(value) => setActiveTab(value)} />
      {isLoading ? (
        <ActivityIndicator size={'large'} color={Colors.PRIMARY} style={{ marginTop: '50%' }} />
      ) : (
        <>
          {activeTab === 'Clinics' ? (
            <ClinicListBig clinicDoctorsList={clinicDoctorsList} />
          ) : (
            <AllDoctorsList doctorList={doctorList} />
          )}
        </>
      )}
    </View>
  );
}