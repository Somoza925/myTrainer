import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, AsyncStorage, SafeAreaView, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import firebaseSDK from '../config/firebaseSDK';
import { onSignIn } from '../auth/auth';

const LoginScreen = ({ navigation }) => {
	const [trainerEmail, setTrainerEmail] = useState('');
	var user = firebase.auth().currentUser;
	var name = user.displayName;
	var email = user.email;
	// var trainerEmail = firebaseSDK.partnerEmail;
	var partnerEmail;

	const logoff = () => {
		firebase.auth().signOut;
		navigation.navigate('Login');
	}
	const userProfilePicture = {
		ProfilePic: require('../../assets/images/profile-icon.png')
	}
	const [value, onChangeText] = useState('');

	const addPartner = () => {
		const current_user_email = firebaseSDK.email;
		var userEmail = current_user_email.toLowerCase();
		var partnerEmail = value.toLowerCase();
		userEmail = userEmail.replace(/\./g, ',');

		setTrainerEmail(partnerEmail);
		firebaseSDK.addPartnerToUser(userEmail, partnerEmail);
	}

	var userEmail = email.replace(/\./g, ',');
	firebase.database().ref('/users/' + userEmail).once('value').then(
		function (snapshot) {
			partnerEmail = snapshot.val().partnerEmail;
			setTrainerEmail(partnerEmail);
		}
	);

	return (
		<SafeAreaView>
			<ScrollView style={styles.container}>
				<View style={styles.Card}>
					<View style={styles.profileCardRow}>
						<Image style={[styles.profilePicture]} source={userProfilePicture.ProfilePic} />
						<View style={styles.profileInfo}>
							<Text
								adjustsFontSizeToFit
								numberOfLines={1}
								style={styles.textHeader}>
								{name}
							</Text>
							<Text
								adjustsFontSizeToFit
								numberOfLines={1}
								style={styles.textSubheading}>
								{email}
							</Text>
							<Text
								adjustsFontSizeToFit
								numberOfLines={1}
								style={styles.textSubheading}>
								Your Partner: {trainerEmail}
							</Text>
						</View>
					</View>
				</View>
				<View style={styles.Card}>
					<Button
						title='Log out'
						type='solid'
						// onPress={() => navigation.navigate('Login')}
						onPress={() => logoff()}
						stlye={styles.buttons}
					/>
				</View>
				<SafeAreaView>
					<TextInput
						style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
						onChangeText={onChangeText}
						value={value}
						placeholder="Input partner email"
					/>
					<Button
						title='Submit'
						type='solid'
						onPress={addPartner}
						stlye={styles.buttons}
					/>
				</SafeAreaView>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		backgroundColor: '#fff'
	},
	Card: {
		padding: 15,
		backgroundColor: '#ffffff',
		marginBottom: 10,
		elevation: 2
	},
	settingsCard: {
		backgroundColor: '#ffffff',
		elevation: 2
	},
	profileCardRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingBottom: 10
	},
	settingsCardRow: {
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1
	},
	lastSettingsCardRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	profilePicture: {
		width: 150,
		height: 125,
		resizeMode: 'contain',
		alignItems: 'center',
		flex: 4
	},
	profileInfo: {
		display: 'flex',
		flexDirection: 'column',
		marginLeft: 10,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 6
	},
	textHeader: {
		alignSelf: 'center',
		fontWeight: 'bold',
		fontSize: 24,
		paddingBottom: 10
	},
	textSubheading: {
		alignSelf: 'flex-start',
		marginLeft: 20
	},
	textTitle: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 24,
		paddingTop: 10
	},
	profileCardBody: {
		alignContent: 'flex-start',
		alignItems: 'center',
		flex: 6
	},
	profileCardBodyAdmin: {
		borderWidth: 1,
		borderColor: 'grey',
		alignItems: 'center',
		flex: 4
	},
	settingsCardText: {
		flexDirection: 'row',
		fontSize: 18,
		paddingHorizontal: 10,
		flex: 8
	},
	settingsCardIcon: {
		flexDirection: 'row',
		flex: 2
	},
	buttons: {
		flex: 1,
		// borderWidth: 1
	},
});


export default LoginScreen;