import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {getEmail} from '../auth/auth';
import firebaseSDK from '../config/firebaseSDK';


const Chat = ({user, messages}) => {
    
    const[currentUser, setUser] = useState({user});

    useEffect(() => { // use this function one time when the component runs
    	getEmail() // getting email of user from async storage
      		.then(res => setUser({...currentUser, name: JSON.stringify(res.email).replace(/['"]+/g, '')  }))
			  .catch(err => alert("An error occurred"));
    }, []);
    
    return (
        <GiftedChat
            messages = {messages}
            onSend = {firebaseSDK.send}
            user = {currentUser}
        />
    );
};

const styles = StyleSheet.create({

});

export default Chat;