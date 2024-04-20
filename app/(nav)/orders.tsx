import { Button, StyleSheet, Text, View } from 'react-native';
import { Sun } from '@tamagui/lucide-icons'
import { useAuth } from '../../context/AuthContext';
import { ListItem, YStack } from 'tamagui';
import { router } from 'expo-router';

const Page = () => {
	const { authState, onLogout } = useAuth();

	const onLogoutPressed = () => {
		onLogout!();
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Orders</Text>
            <YStack paddingVertical="$4" space >
                <ListItem onPress={() => {
                    router.push({ pathname: '/(nav)/order', params: { id: 1}})
                 }} hoverTheme pressTheme icon={Sun} title="order 1" subTitle="Order 1" />
                <ListItem onPress={() => {router.push({ pathname: '/(nav)/order', params: { id: 2}})}} hoverTheme pressTheme icon={Sun} title="order 2" subTitle="order 2" />
                <ListItem onPress={() => {router.push({ pathname: '/(nav)/order', params: { id: 3}})}} hoverTheme pressTheme icon={Sun} title="order 3" subTitle="order 3" />
            </YStack>
		</View>
	);
};

export default Page;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center'
	},
	separator: {
		height: 1,
		marginVertical: 30,
		width: '80%'
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold'
	}
});