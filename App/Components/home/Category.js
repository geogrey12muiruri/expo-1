import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';



import { useNavigation } from '@react-navigation/native';
import SubHeading from './SubHeading';
import Colors from '../Shared/Colors';
import GlobalApi from '../../../Services/GlobalApi';

export default function Category() {
    const [categoryList, setCategoryList] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            const resp = await GlobalApi.getCategories();
            console.log(resp.data.data);
            setCategoryList(resp.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!categoryList) {
        return null;
    }

    return (
        <View style={{ marginTop: 10 }}>
            <SubHeading subHeadingTitle={"Let's Find You a Doctor"} />
            <FlatList
                data={categoryList}
                numColumns={4}
                style={{
                    marginTop: 5
                }}
                columnWrapperStyle={{
                    flex: 1,
                    justifyContent: 'space-between'
                }}
                renderItem={({ item, index }) => index < 4 && (
                    <TouchableOpacity 
                        style={{ alignItems: 'center' }} 
                        onPress={() => navigation.navigate('clinic-doctors-list', { categoryName: item.attributes.name })}
                    >
                        <View style={{
                            backgroundColor: Colors.SECONDARY,
                            padding: 15,
                            borderRadius: 99,
                        }}>
                            <Image
                                source={{
                                    uri: item.attributes.icon.data.attributes.url
                                }}
                                style={{ width: 30, height: 30 }}
                            />
                        </View>
                        <Text>{item.attributes.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}