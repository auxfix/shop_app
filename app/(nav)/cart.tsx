import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'tamagui';
import { router, useNavigation } from 'expo-router';

const Page = () => {
	const navigation = useNavigation()

	return (
		<View style={styles.container}>
			<Text style={styles.title}>All your butifull grocuriesm r you ready to buy?</Text>
			<Button onPress={() => {
				router.push('/(nav)/checkout')
			}}> Checkout</Button>
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