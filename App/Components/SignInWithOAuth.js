import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Button, TouchableOpacity, Text, Dimensions, View, StyleSheet } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/warmUpBrowser";
import Colors from './Shared/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SignInWithOAuth() {
  useWarmUpBrowser();

  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: startFacebookOAuthFlow } = useOAuth({ strategy: "oauth_facebook" });
  const { startOAuthFlow: startTwitterOAuthFlow } = useOAuth({ strategy: "oauth_twitter" });

  const handleOAuthLogin = async (startOAuthFlow) => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };
  return (
<TouchableOpacity
        onPress={() => handleOAuthLogin(startGoogleOAuthFlow)}
        style={[styles.socialButton, { backgroundColor: Colors.primary }]}>
        <Icon name="google" size={24} color={Colors.white} />
        <Text style={styles.socialButtonText}>Login With Google</Text>
      </TouchableOpacity>

  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 20,
    borderRadius: 90,
    width: Dimensions.get('screen').width * 0.8,
    justifyContent: 'center',
  },
  socialButtonText: {
    fontSize: 17,
    color: Colors.white,
    marginLeft: 10,
  },
});