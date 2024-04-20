import { DrawerToggleButton } from '@react-navigation/drawer';
import { Stack } from 'expo-router';
import { useTheme } from 'tamagui';

export const unstable_settings = {
  initialRouteName: 'index',
};

const Layout = () => {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.blue7.get(),
        },
        headerTintColor: '#fff',
        headerShown: false,
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Checkout',
          headerLeft: () => <DrawerToggleButton tintColor="#fff" />,
        }}
      />
      <Stack.Screen
        name="confirmation"
        options={{
          title: 'Congratulations!',
          headerBackTitle: 'Back',
        }}
      />
    </Stack>
  );
};
export default Layout;
