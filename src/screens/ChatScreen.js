import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { View, Text, StyleSheet } from 'react-native';


const ChatScreen = () => {
    return (
        <View>
            <Text>from chat screen</Text>
            <GiftedChat />
        </View>
    );
};

const styles = StyleSheet.create({

});

export default ChatScreen;