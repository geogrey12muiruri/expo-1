import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import ClinicItem from './ClinicItem'
import GlobalApi from '../../../Services/GlobalApi'
import SubHeading from './SubHeading'

export default function Clinics() {
  const[clinicList, setClinicList]=useState([])
  useEffect(()=>{
    getClinics()
  }, [])
  const getClinics=()=>{
    GlobalApi.getClinics().then(resp=>{
      setClinicList(resp.data.data)
    })
  }
  return clinicList&& (
    <View style={{
        marginTop:10
    }}>
      <SubHeading subHeadingTitle={'Discover Clinics Near You'} />

      <FlatList
      data={clinicList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item})=>(
        <ClinicItem clinic={item } />

      )}
      />
    </View>
  )
}