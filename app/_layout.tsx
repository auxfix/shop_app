import {  Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { queryClient } from '../queryClient';
import { QueryClientProvider } from '@tanstack/react-query';


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
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Theme name={'blue'}>
            <StackLayout />
          </Theme>
        </AuthProvider>
      </QueryClientProvider>
    </TamaguiProvider>
	);
};

export default RootLayoutNav;
