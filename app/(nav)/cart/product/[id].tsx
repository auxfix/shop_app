import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { router } from 'expo-router';
import { Button } from 'tamagui';
import { useNavigation } from 'expo-router';

const Page = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const navigation = useNavigation()
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Product Details</Text>
			<Text style={styles.title}>{id}</Text>
			<Button onPress={() => {
				console.log(JSON.stringify(navigation.getState()))
				router.replace('/(nav)/cart')}}>{'Add to Cart'}</Button>
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