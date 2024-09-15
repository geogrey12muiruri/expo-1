import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Animated, Dimensions } from 'react-native';
import TypeWriter from 'react-native-typewriter'; // Import TypeWriter
import homeImage from '../../assets/images/welcome.png';
import Colors from '../shared/Colors';
import GlobalApi from '../services/GlobalApi'; 
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignInWithOAuth from '../components/SignInWithOAuth';
import SharedHeader from '../components/shared/SharedHeader';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;

    const handleLogin = async () => {
        try {
            const response = await GlobalApi.login({ email, password });
            const { token } = response.data;
            if (token) {
                await AsyncStorage.setItem('token', token);
                Alert.alert('Login successful');
                navigation.navigate('Home');
            } else {
                throw new Error('Authentication failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            Alert.alert('Login failed', 'Invalid email or password');
        }
    };

    const handleGetStarted = () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            <SharedHeader title={""} /> 
            <View style={styles.logoContainer}>
                <Image
                    source={{ uri: 'https://res.cloudinary.com/dws2bgxg4/image/upload/v1717428114/logomed_gj1nuw.avif' }}
                    style={styles.logo}
                />
            </View>

            <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
                <Text style={styles.getStartedButtonText}>Get Started</Text>
            </TouchableOpacity>

            <Animated.View style={[styles.loginContainer, { transform: [{ translateY: slideAnim }] }]}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.formContainer}>
                        {/* Applying typing animation here */}
                        <TypeWriter typing={1}>
                            <Text style={styles.heading}>Welcome to MedPlus</Text>
                        </TypeWriter>

                        <TypeWriter typing={1} delayMap={[{ at: 3, delay: 500 }]}>
                            <Text style={styles.subHeading}>Connecting Patients and Doctors Effortlessly</Text>
                        </TypeWriter>

                        <TypeWriter typing={1} delayMap={[{ at: 3, delay: 700 }]}>
                            <Text style={styles.subHeading}>Book Appointments, Anytime, Anywhere</Text>
                        </TypeWriter>

                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />

                        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>

                        <SignInWithOAuth />

                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
    },
    getStartedButton: {
        backgroundColor: Colors.SECONDARY,
        padding: 15,
        borderRadius: 5,
        marginBottom: 50,
        width: '80%',
        alignItems: 'center',
    },
    getStartedButtonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: Colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    scrollViewContent: {
        alignItems: 'center',
        backgroundColor: Colors.ligh_gray,
    },
    formContainer: {
        backgroundColor: Colors.white,
        padding: 25,
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    subHeading: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: Colors.gray,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 20,
        paddingHorizontal: 10
    },
    loginButton: {
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: '100%',
        alignItems: 'center'
    },
    loginButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    },
    forgotPasswordText: {
        color: Colors.primary,
        marginTop: 20,
        textDecorationLine: 'underline'
    },
    signUpText: {
        color: Colors.primary,
        marginTop: 20,
        textDecorationLine: 'underline'
    }
});

export default Login;

