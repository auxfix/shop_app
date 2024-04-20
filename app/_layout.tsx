import { useEffect } from 'react';
import { Slot, SplashScreen, Stack, useRouter } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';

import { TamaguiProvider, Theme, useTheme } from 'tamagui';

import config from '../tamagui.config';
import { useFonts } from 'expo-font';

const StackLayout = () => {

  const theme = useTheme();
	const { authState } = useAuth();
	const router = useRouter();

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

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
