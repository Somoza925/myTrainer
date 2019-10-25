import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const LoginScreen = ({navigation}) => {
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text> Login Page! </Text>
          <Button title ="Log me in!" onPress = {() => navigation.navigate('App')}/>
        </View>
      );
}


const styles = StyleSheet.create({});


export default LoginScreen;