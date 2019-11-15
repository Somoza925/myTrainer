import { AsyncStorage } from "react-native";

export const EMAIL = 'email';

export const onSignIn = (email) => AsyncStorage.setItem(EMAIL, JSON.stringify(email));

export const onSignOut = () => AsyncStorage.removeItem(EMAIL);

export const getEmail = async () =>{
    try {
        const retrievedItem =  await AsyncStorage.getItem(EMAIL);
        const item = JSON.parse(retrievedItem);
        return retrievedItem;
      } catch (error) {
        console.log(error.message);
      }
      return
    };

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(EMAIL)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};
