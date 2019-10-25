import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import firebaseSDK from '../config/firebaseSDK';

const LoginScreen = ({ navigation }) => {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [avatar, setAvatar] = useState('');	

	onPressLogin = async () => {
		const user = {
			name: name,
			email: email,
			password: password,
			avatar: avatar
		}; 

		const response = firebaseSDK.login(
			user,
			this.loginSuccess,
			this.loginFailed
		)
	}

	loginSuccess = () => {
		console.log('login successful, navigate to the chat');
		navigation.navigate('App', {
			name: name,
			email: email,
			avatar: avatar
		});
	}

	loginFailed = () => {
		alert('Login failure. Please tried again.');
	}

	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<Text style={styles.title}>myTrainer</Text>
				<TextInput 
					style={styles.inputField}
					placeholder='email...' 
					onChangeText={setEmail}
					value={email}
				/>
				<TextInput
					style={styles.inputField}
					placeholder='Password...' 
					onChangeText={setPassword}
					value={password}
				/>
				<View style={styles.buttonRow}>
					<Button
						title='Log in'
						type='solid'
						onPress={this.onPressLogin}
						style={styles.buttons}
					/>
					<Button
						title='Sign up'
						type='solid'
						onPress={() => navigation.navigate('App')}
						stlye={styles.buttons}
					/>
				</View>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#ffffff',
		paddingHorizontal: 75,
		paddingVertical: 175,
		flex: 1
	},
	card: {
		backgroundColor: '#ffffff',
		borderRadius: 5,
		shadowOpacity: 5,
		shadowColor: 'gray',
		shadowOffset: {
			width: -3,
			height: 3
		},
		padding: 5
	},
	title: {
		fontSize: 46,
		textAlign: 'center',
		paddingBottom: 30,
	},
	inputField: {
		height: 35,
		paddingLeft: 5,
		marginBottom: 5,
		borderWidth: 0.5,
		borderRadius: 5,
		borderColor: 'gray'
	},
	buttonRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 40,
		paddingTop: 10,
	},
	buttons: {
		flex: 1,
		// borderWidth: 1
	},
});


export default LoginScreen;