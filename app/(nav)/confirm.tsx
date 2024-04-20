import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Button } from 'tamagui';
import React from 'react';
import { router } from 'expo-router';

const Page = () => {
	const { authState, onLogout } = useAuth();

	const onLogoutPressed = () => {
		onLogout!();
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>We will deliver it soon</Text>
			<Button onPress={() => {
				router.push('/(nav)/shop')
			}}>Pay</Button>
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