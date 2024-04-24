import { useFonts } from 'expo-font';
import { SplashScreen, useRootNavigationState } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Input, Button, H2, useTheme } from 'tamagui';

import { useAuth } from '../context/AuthContext';

const Page = () => {
  const theme = useTheme();
  const rootNavigationState = useRootNavigationState();

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin } = useAuth();

  const onSignInPressUser1 = async () => {
    onLogin!('john_doe', 'password123');
  };

  const onSignInPressUser2 = async () => {
    onLogin!('jane_smith', 'qwerty456');
  };

  const onSignInPressAdmin = async () => {
    onLogin!('alice_green', 'alicePass789');
  };

  const onSignInPress = async () => {
    onLogin!(username, password);
  };

  if (!loaded) return null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <H2 color={theme.blue4} my={25} textAlign="center">
        My Shop
      </H2>
      <Input
        mt={30}
        backgroundColor="white"
        color={theme.blue8}
        placeholderTextColor={theme.blue8}
        autoCapitalize="none"
        placeholder="username"
        value={username}
        onChangeText={setUsername}
      />
      <Input
        my={10}
        backgroundColor="white"
        placeholder="password"
        color={theme.blue8}
        placeholderTextColor={theme.blue8}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button mt={55} onPress={onSignInPressUser1}>
        Sign in User 1
      </Button>
      <Button mt={15} onPress={onSignInPressUser2}>
        Sign in User 2
      </Button>
      <Button mt={15} onPress={onSignInPressAdmin}>
        Sign in Admin
      </Button>
      <Button mt={15} onPress={onSignInPress}>
        Sign in
      </Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingHorizontal: '20%',
    justifyContent: 'center',
  },
});

export default Page;
