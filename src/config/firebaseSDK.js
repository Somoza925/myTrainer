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
      
}
const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;