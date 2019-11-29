import firebase from 'firebase';
import {useState} from 'react';

class FirebaseSDK {
	constructor() {
		if (!firebase.apps.length) {
			//avoid re-initializing
			firebase.initializeApp({
				apiKey: "AIzaSyCMjiVgYfwDnDNBRgTCX3UcyUBDmG1kKh4",
				authDomain: "mytrainer-ed90e.firebaseapp.com",
				databaseURL: "https://mytrainer-ed90e.firebaseio.com",
				projectId: "mytrainer-ed90e",
				storageBucket: "mytrainer-ed90e.appspot.com",
				messagingSenderId: "472819916580",
			});
		}
	}

	login = async (user, success_callback, failed_callback) => {
		await firebase
			.auth()
			.signInWithEmailAndPassword(user.email, user.password)
			.then(success_callback, failed_callback);
	};

	ref = (route) => {
		// return firebase.database().ref(`chats/${firebase.auth().currentUser.uid}/${this.ChatID}`);
		return firebase.database().ref(route);
	}

	parse = snapshot => {
		const { timestamp: numberStamp, text, user } = snapshot.val();
		const { key: _id } = snapshot;
		const timestamp = new Date(numberStamp);
		const message = {
			_id,
			timestamp,
			text,
			user,
		};
		return message;
	};

	on = (chatid,callback) =>
		this.ref('chatrooms/' + chatid + '/messages/')
			.limitToLast(20)
			.on('child_added', snapshot => callback(this.parse(snapshot)));

	get timestamp() {
		return firebase.database.ServerValue.TIMESTAMP;
	}

	// send the message to the Backend
	send = (messages, chatid) => {
		for (let i = 0; i < messages.length; i++) {
			const { text, user } = messages[i];
			const message = {
				text,
				user,
				timestamp: this.timestamp,
			};
			this.append(message, chatid);
		}
	};

	append = (message, chatid) => this.ref('chatrooms/' + chatid + '/messages/').push(message);

	get uid() {
		return (firebase.auth().currentUser || {}).uid;
	}

	get email() {
		return (firebase.auth().currentUser || {}).email;
	}
	get name() {
		return (firebase.auth().currentUser || {}).displayName;
	}

	// get partnerEmail() {
	// 	const [trainerEmail, setTrainerEmail] = useState('');
	// 	var partnerEmail;
	// 	var userEmail = firebase.auth().currentUser.email.replace(/\./g, ',');
	// 	firebase.database().ref('/users/' + userEmail).once('value').then(
	// 		function (snapshot) {
	// 			partnerEmail = snapshot.val().partnerEmail;
	// 			console.log("firebaseSDK", partnerEmail);
	// 			setTrainerEmail(partnerEmail);
	// 		}
	// 	);
	// 	return trainerEmail;
	// }

	// close the connection to the Backend
	off =(route) =>{
		firebase.database().ref(route).off();
	}

	writeUserData = (user) => {
		var email = user.email.toLowerCase();
		email = email.replace(/\./g, ',');
		firebase.database().ref('users/' + email).set({ // create user in database
			username: user.name,
			email: user.email,
			chats: [],
		  });
	}

	addChatToUser =(userEmail, chatid, targetEmail) =>{
		var newChatRef = firebase.database().ref('users/' + userEmail + '/chats/').push();
		newChatRef.set({
			chatid: chatid,
			user: targetEmail
		});
	}

	getChatKeys = (email) => {
		var chats = [];
		var query = firebase.database().ref('users/' + email + '/chats/').orderByKey();
		// we return the promise created by query.once
		return query.once("value").then((snapshot) => {
			snapshot.forEach((childSnapshot) => {
				console.log(childSnapshot.key + " -- " +  childSnapshot.val().chatid);
				chats.push(childSnapshot.val());
			})

			return chats;
		});
	}

	createChat = (chatroom, chatid) =>{
		firebase.database().ref('chatrooms/' + chatid).set(chatroom);
		
	}

	createAppointment = (appointment, appointmentid) => {
		firebase.database().ref('appointments/' + appointmentid).set(appointment);
	}

	addCalendarToUser = (userEmail, date, workout, nutrition) =>{
		console.log("we are in addCalendarToUSer");
		var newAppointmentRef = firebase.database().ref('users/' + userEmail + '/calendar/').push();
		newAppointmentRef.set({
			appointmentDate: date,
			workout: workout,
			nutrition: nutrition
		});
	}

	setAppointment = (userEmail, date, time, workout) =>{
		console.log("we are in addCalendarToUSer");
		var newAppointmentRef = firebase.database().ref('users/' + userEmail + '/calendar/');
		newAppointmentRef.set({
			appointmentDate: date,
			appointmentTime: time,
			workoutType: workout,
		});
	}

	// shareCalendar = (targetEmail, date, workout, nutrition) => {
	// 	var newAppointmentRef = firebase.database().ref('users/' + targetEmail + '/calendar/').push();
	// 	newAppointmentRef.set({
	// 		appointmentDate: date,
	// 		workout: workout,
	// 		nutrition: nutrition
	// 	});
	// }

	getCalenderInfo = (userEmail) => {
		var calendarInfo = [];
		var query = firebase.database().ref('users/' + userEmail + '/calendar/').orderByKey();
		return query.once("value").then((snapshot) => {
			snapshot.forEach((childSnapshot) => {
				calendarInfo.push(childSnapshot.val());
			})
			return calendarInfo;
		});
	}

	addPartnerToUser = (userEmail, partnerEmail) => {
		var addPartnerToUserRef = firebase.database().ref('users/' + userEmail);
		addPartnerToUserRef.update({
			partnerEmail: partnerEmail,
		});

		var addPartnerToUserRef = firebase.database().ref('users/' + partnerEmail.replace(/\./g, ','));
		addPartnerToUserRef.update({
			partnerEmail: userEmail.replace(/\,/g, '.'),
		});

	}

	createAccount = async user => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(user.email, user.password)
			.then(
				function () { 
					console.log(
						'created user successfully. User email:' +
						user.email +
						' name:' +
						user.name
					);
					var userf = firebase.auth().currentUser;
					userf.updateProfile({ displayName: user.name }).then(
						function () {
							console.log('Updated displayName successfully. name:' + user.name);
							alert( 
								'User ' + user.name + ' was created successfully. Please login.'
							);
						},
						function (error) {
							console.warn('Error update displayName.');
						}
					);	
				},
				function (error) {
					console.error('got error:' + typeof error + ' string:' + error.message);
					alert('Create account failed. Error: ' + error.message);
				}
			);
	};
}

const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;