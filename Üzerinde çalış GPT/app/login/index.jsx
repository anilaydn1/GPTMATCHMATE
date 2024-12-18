import { View, Text, Pressable, Image } from 'react-native';
import React, { useCallback } from 'react';
import Colors from './../../constants/Colors';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import { link } from 'expo-router'


export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      });

      if (createdSessionId) {
        // Successful login logic here
      } else {
        // Additional steps like MFA
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./../../assets/images/welcome_page_.jpg')}
          style={styles.image}
        />
        <Text style={styles.title}>Unite, compete, and repeat!</Text>
        <Text style={styles.subtitle}>
          Let's find the perfect rival for your team and bring the excitement back to the game!
        </Text>
      </View>
      <View style={styles.footer}>
        <Pressable onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 30,
    textAlign: 'center',
  },
  subtitle: {
    padding: 5,
    fontSize: 18,
    fontFamily: 'outfit',
    textAlign: 'center',
    color: Colors.GRAY,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  button: {
    padding: 14,
    backgroundColor: Colors.PRIMARY,
    width: '90%',
    borderRadius: 14,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    fontSize: 20,
    color: Colors.WHITE,
  },
};
