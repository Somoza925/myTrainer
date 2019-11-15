import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebaseSDK from '../config/firebaseSDK';


const Chat = ({user, messages, chatid}) => {
    return (
        <GiftedChat
            messages = {messages}
            onSend = {messages => firebaseSDK.send(messages, chatid)}
            user = {user}
        />
    );
};

const styles = StyleSheet.create({

});

export default Chat;