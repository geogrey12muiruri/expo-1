import { View, Text, Image } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
export default function Header() {
    const { isLoaded, isSignedIn, user } = useUser();
    console.log(user)
    
    if (!isLoaded || !isSignedIn) {
        return null;
    }

    

    const fullName = `${user.firstName} ${user.lastName}`;
    const profileImageUrl = user.profileImageUrl || user.imageUrl || user.avatarUrl; // Adjust based on actual property name

    return (
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View
            style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 4,
            alignItems: 'center',
              }}>
                <Image  source={{ uri: profileImageUrl }}  style={{ width: 50, height: 50, borderRadius: 99 }} />
            
            <View>
            <Text style={{fontFamily: 'Inter-Black'}}>Hello, 👋</Text>
            <Text
                style={{
                    fontSize: 18,
                    fontFamily: 'Inter-Black-Bold',
                }}
            >{fullName}</Text>
            </View>
            </View>
            {/* notificationIcon */}
            <MaterialIcons name="notifications" size={28} color="black" />
        </View>
    );
}