import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { TamaguiProvider, Theme } from 'tamagui';

import config from '../tamagui.config';

const StackLayout = () => {
	const { authState } = useAuth();
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		if (!authState?.authenticated) {
			router.replace('/');
		} 
	}, [authState]);

	return (
		<Stack>
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
