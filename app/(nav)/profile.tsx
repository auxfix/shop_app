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

const Page = () => {
	const [username, setUsername] = useState('admin');
	const [password, setPassword] = useState('admin');
	const { onLogin, authState, onLogout } = useAuth();

	const onLogoutPressed = () => {
		onLogout!();
	};

	const onSignInPress = async () => {
		onLogin!(username, password);
	};

	return (
        authState?.authenticated ? (
            <View style={styles.container}>
			<Text style={styles.title}>Admin</Text>
			<Text style={styles.title}>Role: {authState?.role}</Text>
			<Button title="Logout" onPress={onLogoutPressed} />
			<View style={styles.separator} />
		    </View>
        ): (
            <KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			<Text style={styles.header}>My Shop</Text>
			<TextInput
				autoCapitalize="none"
				placeholder="admin"
				value={username}
				onChangeText={setUsername}
				style={styles.inputField}
			/>
			<TextInput
				placeholder="password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
				style={styles.inputField}
			/>

			<TouchableOpacity onPress={onSignInPress} style={styles.button}>
				<Text style={{ color: '#fff' }}>Sign in</Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
        )
	);
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
