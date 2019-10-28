import firebase from 'firebase';

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