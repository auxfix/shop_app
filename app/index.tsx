import React, { useEffect, useState } from 'react';
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
import { Role, useAuth } from '../context/AuthContext';
import { SplashScreen, router, useRootNavigationState } from 'expo-router';
import { useFonts } from 'expo-font';

const Page = () => {
	const rootNavigationState = useRootNavigationState();
	const [loaded] = useFonts({
		Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
		InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
	});

	useEffect(() => {
	if (loaded) {
		SplashScreen.hideAsync();
	}
	}, [loaded]);

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { onLogin, authState, onLogout } = useAuth();

	const onLogoutPressed = () => {
		onLogout!();
	};

	useEffect(() => {
		if (authState?.authenticated === true && authState.role === Role.ADMIN) {
			router.push('/(nav)/orders');
		} else if (authState?.authenticated === true && authState.role === Role.USER) {
			router.push('/(nav)/shop');
		}
	}, [authState]);

	const onSignInPressUser1 = async () => {
		onLogin!('john_doe', 'password123');
	};

	const onSignInPressUser2 = async () => {
		onLogin!('jane_smith', 'qwerty456');
	};

	const onSignInPressAdmin = async () => {
		onLogin!('alice_green', 'alicePass789');
	};

	const onSignInPress = async () => {
		onLogin!(username, password);
	};

	if(!loaded) return null;

	return (
            <KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			<Text style={styles.header}>My Shop</Text>
			<TextInput
				autoCapitalize="none"
				placeholder="username"
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

			<TouchableOpacity onPress={onSignInPressUser1} style={styles.button}>
				<Text style={{ color: '#fff' }}>Sign User 1</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={onSignInPressUser2} style={styles.button}>
				<Text style={{ color: '#fff' }}>Sign User 2</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={onSignInPressAdmin} style={styles.button}>
				<Text style={{ color: '#fff' }}>Sign Admin</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={onSignInPress} style={styles.button}>
				<Text style={{ color: '#fff' }}>Sign </Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>)
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

