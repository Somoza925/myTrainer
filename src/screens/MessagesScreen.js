import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import useChatResults from '../hooks/chatResults';
import SearchBar from '../components/SearchBar';
import firebaseSDK from '../config/firebaseSDK';

const MessagesScreen = ({navigation}) => {

    const [getChatIDs, results, errorMessage] = useChatResults();

    const [searchEmail, setSearchEmail] = useState('');
    
    const stringToHash = (string) => { 
                  
		var hash = 0; 
		  
		if (string.length == 0) return hash; 
		  
		for (i = 0; i < string.length; i++) { 
			char = string.charCodeAt(i); 
			hash = ((hash << 5) - hash) + char; 
			hash = hash & hash; 
		} 
		  
		return hash; 
    }

	const createChat = (email) => {

		var emailtemp = email.toLowerCase();
		emailtemp = emailtemp.replace(/\./g, ',');

		firebaseSDK.ref("users/" + emailtemp).once("value").then(function(snapshot){
			if (snapshot.exists()){ // email exists
				newChat(email, getChatIDs);
			} else {
				alert("email does not exist");
			}
		});
    }
    
    const newChat = (targetEmail, getchatids) => {
		const current_user_email = firebaseSDK.email;
		var userEmail = current_user_email.toLowerCase();
        userEmail = userEmail.replace(/\./g, ',');

        var temp_targetEmail = targetEmail.toLowerCase();
        temp_targetEmail = temp_targetEmail.replace(/\./g, ',');

        const chatid = stringToHash(userEmail+targetEmail);

		var chat = { 
			user1: current_user_email,
			user2: targetEmail
		}

		firebaseSDK.createChat(chat, chatid);
		firebaseSDK.addChatToUser(userEmail, chatid, targetEmail);
        firebaseSDK.addChatToUser(temp_targetEmail, chatid, current_user_email);
        getchatids(); 
	}


	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <SearchBar 
                term = {searchEmail}
                onTermChange = {setSearchEmail}
                onTermSubmit = {() =>{
                    createChat(searchEmail);
                }}
            />
            <View style = {styles.container}>

            </View>
            <FlatList
                data = {results}
                keyExtractor = {(result) => String(result.chatid)} // important for performance
                renderItem = {({item}) => { 
                    return (<TouchableOpacity
                        style = {styles.button}
                        onPress = {() => {navigation.navigate('ChatScreen', {chatid: item.chatid})}}
                    > 
                        <Text>Chat with {item.user}</Text> 
                    </TouchableOpacity>)
                }}
            />
		</View>
	);
}


const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
      }, 
      container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10
      }

});


export default MessagesScreen;