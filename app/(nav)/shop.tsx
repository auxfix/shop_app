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
			<Text style={styles.title}></Text>
            <YStack paddingVertical="$4" space >
                <ListItem onPress={() => {
                    router.push({ pathname: '/(nav)/product', params: { id: 1}})
                 }} hoverTheme pressTheme icon={Sun} title="Product 1" subTitle="Product 1" />
                <ListItem onPress={() => {router.push({ pathname: '/(nav)/product', params: { id: 2}})}} hoverTheme pressTheme icon={Sun} title="Product 2" subTitle="Product 2" />
                <ListItem onPress={() => {router.push({ pathname: '/(nav)/product', params: { id: 3}})}} hoverTheme pressTheme icon={Sun} title="SProduct 3" subTitle="Product 3" />
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