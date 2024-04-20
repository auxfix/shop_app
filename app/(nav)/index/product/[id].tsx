import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../../../context/AuthContext';
import { useLocalSearchParams } from 'expo-router';

const Page = () => {
	const { id } = useLocalSearchParams<{ id: string }>();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Product Details</Text>
			<Text style={styles.title}>{id}</Text>
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