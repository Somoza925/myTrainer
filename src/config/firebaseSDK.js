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

  get ref() {
		// return firebase.database().ref(`chats/${firebase.auth().currentUser.uid}/${this.ChatID}`);
		return firebase.database().ref('messages');
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
  
  on = callback =>
		this.ref
			.limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));
  
  get timestamp() {
		return firebase.database.ServerValue.TIMESTAMP; 
  }    
  
  // send the message to the Backend
	send = messages => {
		for (let i = 0; i < messages.length; i++) {
			const { text, user } = messages[i];
			const message = {
				text,
				user,
				timestamp: this.timestamp,
			};
			this.append(message);
		}
  };
  
  append = message => this.ref.push(message);

  get uid() {
		return (firebase.auth().currentUser || {}).uid;
	}

  // close the connection to the Backend
	off() {
		this.ref.off();
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