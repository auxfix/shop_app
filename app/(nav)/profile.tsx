import React, { useState } from 'react';
import {
	Text,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	TextInput,
	TouchableOpacity,
    Button,
    View
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { router } from 'expo-router';

const Page = () => {
	const [username, setUsername] = useState('admin');
	const [password, setPassword] = useState('admin');
	const { onLogin, authState, onLogout } = useAuth();

	const onLogoutPressed = () => {
		onLogout!();
		router.replace('/');
	};

	const onSignInPressUser = async () => {
		onLogin!('user', 'user');
	};

	const onSignInPressAdmin = async () => {
		onLogin!('admin', 'admin');
	};

	return (
          <View style={styles.container}>
			<Text style={styles.title}>Profile:</Text>
			<Text style={styles.title}>Name: {authState?.user?.username}</Text>
			<Text style={styles.title}>Email: {authState?.user?.email}</Text>
			<Text style={styles.title}>Role: {authState?.role}</Text>
			<Button title="Logout" onPress={onLogoutPressed} />
			<View style={styles.separator} />
		  </View>
        )
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		paddingHorizontal: '20%',
		justifyContent: 'center'
	},
	header: {
		fontSize: 30,
		textAlign: 'center',
		marginBottom: 40
	},
	inputField: {
		marginVertical: 4,
		height: 50,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 4,
		padding: 10
	},
	button: {
		marginVertical: 15,
		alignItems: 'center',
		backgroundColor: '#111233',
		padding: 12,
		borderRadius: 4
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

export default Page;
