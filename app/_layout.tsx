import { useEffect } from 'react';
import { Slot, SplashScreen, Stack, useRouter } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';

import { TamaguiProvider, Theme, useTheme } from 'tamagui';

import config from '../tamagui.config';

const StackLayout = () => {
  const theme = useTheme();
	return (
		<Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: theme.blue7.get(),
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="(nav)" options={{ headerShown: false }} />
		</Stack>
	);
};

const RootLayoutNav = () => {
	return (
    <TamaguiProvider config={config}>
      <AuthProvider>
        <Theme name={'blue'}>
          <StackLayout />
        </Theme>
      </AuthProvider>
    </TamaguiProvider>
	);
};

export default RootLayoutNav;
