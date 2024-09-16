import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import GlobalApi from '../../Services/GlobalApi'; // Import GlobalApi
import Colors from '../Components/Shared/Colors';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const handleLogin = () => {
    if (email === 'test@example.com' && password === 'password') {
      Alert.alert('Login Successful', 'Welcome back!');
    } else {
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset link sent to your email.');
  };

  const handleOAuthLogin = async (startOAuthFlow) => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
        const code = signIn || signUp;
        const response = await GlobalApi.googleOAuthCallback(code);
        if (response.data) {
          // Handle successful login
          Alert.alert('Login Successful', 'Welcome back!');
        } else {
          // Handle login failure
          Alert.alert('Login Failed', 'Unable to login with Google');
        }
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  const handleSocialLogin = (platform) => {
    if (platform === 'Google') {
      handleOAuthLogin(startGoogleOAuthFlow);
    } else {
      Alert.alert(`Login with ${platform}`, `Logging in with ${platform}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image source={require('../../assets/topVector.png')} style={styles.topImage} />
      </View>
      <View style={styles.helloContainer}>
        <Text style={styles.helloText}>Hello</Text>
      </View>
      <View>
        <Text style={styles.signInText}>Sign in to your account</Text>
      </View>
      <Animatable.View animation="fadeInUp" delay={300} style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </Animatable.View>
      <Animatable.View animation="fadeInUp" delay={400} style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </Animatable.View>
      <View style={styles.rememberMeContainer}>
        <BouncyCheckbox
          size={25}
          fillColor="red"
          unFillColor="#FFFFFF"
          text="Remember me"
          iconStyle={{ borderColor: "red" }}
          innerIconStyle={{ borderWidth: 2 }}
          textStyle={{ fontFamily: "JosefinSans-Regular" }}
          onPress={(isChecked) => { console.log(isChecked) }}
        />
      </View>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.socialLoginContainer}>
        <Animatable.View animation="bounceIn" delay={500}>
          <TouchableOpacity onPress={() => handleSocialLogin('Google')}>
            <FontAwesome name="google" size={32} color="#DB4437" />
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation="bounceIn" delay={600}>
          <TouchableOpacity onPress={() => handleSocialLogin('Facebook')}>
            <FontAwesome name="facebook" size={32} color="#4267B2" />
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation="bounceIn" delay={700}>
          <TouchableOpacity onPress={() => handleSocialLogin('Twitter')}>
            <FontAwesome name="twitter" size={32} color="#1DA1F2" />
          </TouchableOpacity>
        </Animatable.View>
      </View>
      <TouchableOpacity style={styles.signUpButton} onPress={() => Alert.alert('Sign Up', 'Navigate to sign up screen')}>
        <Text style={styles.signUpButtonText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  topImageContainer: {},
  topImage: {
    width: '100%',
    height: 130,
  },
  helloContainer: {},
  helloText: {
    textAlign: 'center',
    fontSize: 70,
    fontWeight: '500',
    color: '#262626',
  },
  signInText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#262626',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '80%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMeText: {
    marginLeft: 10,
    color: '#666',
  },
  forgotPassword: {
    color: '#1E90FF',
    textAlign: 'right',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 20,
  },
  signUpButton: {
    marginTop: 20,
  },
  signUpButtonText: {
    color: '#1E90FF',
    textAlign: 'center',
  },
});