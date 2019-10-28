import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {getEmail} from '../auth/auth';
import firebaseSDK from '../config/firebaseSDK';


const Chat = ({user, messages}) => {
    return (
        <GiftedChat
            messages = {messages}
            onSend = {firebaseSDK.send}
            user = {user}
        />
    );
};

const styles = StyleSheet.create({

});

export default Chat;