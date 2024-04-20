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
					name="shop"
					options={{
						headerTitle: 'Shop',
						drawerLabel: 'Shop',
						headerShown: true,
						drawerIcon: ({ size, color }: any) => (
							<Ionicons name="home-outline" size={size} color={color} />
						)
					}}
					redirect={authState?.role !== Role.USER}
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
						drawerItemStyle: { height: 0 },
						drawerLabel: 'Checkout',
						headerShown: true,
						drawerIcon: ({ size, color }) => (
							<Ionicons name="cog-outline" size={size} color={color} />
						)
					}}
					redirect={authState?.role !== Role.USER}
				/>
				<Drawer.Screen
					name="profile"
					options={{
						headerTitle: 'Profile',
						drawerLabel: 'Profile',
						drawerIcon: ({ size, color }) => (
							<Ionicons name="cog-outline" size={size} color={color} />
						)
					}}
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
				<Drawer.Screen
					name="product"
					options={{
						drawerItemStyle: { height: 0 },
						headerTitle: 'Product',
						drawerLabel: 'Product',
						drawerIcon: ({ size, color }) => (
							<Ionicons name="cog-outline" size={size} color={color} />
						)
					}}
					redirect={authState?.role !== Role.USER}
				/>
				<Drawer.Screen
					name="order"
					options={{
						drawerItemStyle: { height: 0 },
						headerTitle: 'Order',
						drawerLabel: 'Order',
						drawerIcon: ({ size, color }) => (
							<Ionicons name="cog-outline" size={size} color={color} />
						)
					}}
					redirect={authState?.role !== Role.ADMIN}
				/>
				<Drawer.Screen
					name="confirm"
					options={{
						drawerItemStyle: { height: 0 },
						headerTitle: 'Confirmation',
						drawerLabel: 'Confirmation',
						drawerIcon: ({ size, color }) => (
							<Ionicons name="cog-outline" size={size} color={color} />
						)
					}}
					redirect={authState?.role !== Role.USER}
				/>
			</Drawer>
		</GestureHandlerRootView>
	);
};

export default DrawerLayout;