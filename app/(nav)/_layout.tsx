import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Role, useAuth } from '../../context/AuthContext';
import { useTheme } from 'tamagui';

const DrawerLayout = () => {
	const { authState } = useAuth();
	const theme = useTheme();

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Drawer
				
				screenOptions={{
					headerStyle: {
					  backgroundColor: theme.blue7.get(),
					},
					headerTintColor: '#fff',
				  }}
			>
				<Drawer.Screen
					name="index"
					options={{
						headerTitle: 'Shop',
						drawerLabel: 'Shop',
						headerShown: false,
						drawerIcon: ({ size, color }: any) => (
							<Ionicons name="home-outline" size={size} color={color} />
						)
					}}
				/>

				<Drawer.Screen
					name="cart"
					options={{
						headerTitle: 'Cart',
						drawerLabel: 'Cart',
						headerShown: true,
						drawerIcon: ({ size, color }: any) => (
							<Ionicons name="newspaper-outline" size={size} color={color} />
						)
					}}
					redirect={authState?.role !== Role.USER}
				/>
				<Drawer.Screen
					name="checkout"
					options={{
						headerTitle: 'Checkout',
						drawerLabel: 'Checkout',
						headerShown: true,
						drawerIcon: ({ size, color }) => (
							<Ionicons name="cog-outline" size={size} color={color} />
						)
					}}
					redirect={authState?.role !== Role.USER}
				/>
				<Drawer.Screen
					name="orders"
					options={{
						headerTitle: 'Orders',
						drawerLabel: 'Orders',
						drawerIcon: ({ size, color }) => (
							<Ionicons name="cog-outline" size={size} color={color} />
						)
					}}
					redirect={authState?.role !== Role.ADMIN}
				/>
			</Drawer>
		</GestureHandlerRootView>
	);
};

export default DrawerLayout;