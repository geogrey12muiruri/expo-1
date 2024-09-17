import { View, Text, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import GlobalApi from '../../Services/GlobalApi';


export default function Slider() {
  const [sliderList, setSliderList] = useState();
 
  useEffect(()=>{
     getSlider();
  }, [])
const getSlider = ()=> {
  GlobalApi.getSlider().then(resp=>{
    console.log(resp.data.data);
    setSliderList(resp.data.data)
  })
}
  return (
    <View style={{ marginTop: 10 }}>
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.attributes.image.data.attributes.url }}
            style={{
              width: Dimensions.get('screen').width * 0.9,
              height: 170,
              borderRadius: 10,
              margin: 2
            }}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}