import { View, Text, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import GlobalApi from '../../Services/GlobalApi';


export default function Slider() {
  const [sliderList, setSliderList] = useState();
  // const sliderList = [
  //   {
  //     id: 1,
  //     name: 'Slider 1',
  //     imageurl: 'https://res.cloudinary.com/dws2bgxg4/image/upload/v1724863359/udwag9wfbll6ry39iv9w.png'
  //   },
  //   {
  //     id: 2,
  //     name: 'Slider 2',
  //     imageurl: 'https://res.cloudinary.com/dws2bgxg4/image/upload/v1714993049/image3_b7pxgc.jpg'
  //   },
  //   {
  //     id: 3,
  //     name: 'Slider 3',
  //     imageurl: 'https://res.cloudinary.com/dws2bgxg4/image/upload/v1715100264/cdb1reaaf5jwvcnx2z9c.jpg'
  //   }
  // ]
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