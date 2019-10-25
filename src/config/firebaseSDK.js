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
}
const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;