import React, {useState} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import firebaseSDK from '../config/firebaseSDK';


const Chat = ({navigation}) => {
    
    const [messages, setMessages] = useState([]);


        

    return (
        <GiftedChat/>
    );
};

const styles = StyleSheet.create({

});

export default Chat;