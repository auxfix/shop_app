import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Role, useAuth } from '../../context/AuthContext';

const DrawerLayout = () => {
	const { authState } = useAuth();

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Drawer>
				<Drawer.Screen
					name="index"
					options={{
						headerTitle: 'Shop',
						drawerLabel: 'Shop',
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