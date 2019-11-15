import React from 'react';
import { Platform, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import firebaseSDK from '../config/firebaseSDK';
import Chat from '../components/Chat';

class ChatScreen extends React.Component {
	state = {
		messages: [],
		name: '',
		chatid: this.props.navigation.getParam('chatid', 'NO-ID')
	};

	get user() { 
		return {
			name: firebaseSDK.email, 
			_id: firebaseSDK.uid,
		};
	}

	render() {
		const mainContent = (
			<Chat
				user={this.user}
				messages={this.state.messages}
				chatid = {this.state.chatid}
			/>
		);
		if (Platform.OS === 'android') {
			return (
				<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={80} enabled>
					{mainContent}
				</KeyboardAvoidingView>
			);
		} else {
			return (<SafeAreaView style={{ flex: 1 }}>
				{mainContent}
			</SafeAreaView>)
		}
	} 
	componentDidMount() {
		console.log(this.state.chatid);
		firebaseSDK.on((this.state.chatid),message =>
			this.setState(previousState => ({
				messages: GiftedChat.append(previousState.messages, message),
			}))
		);  
	}
	componentWillUnmount() {
		firebaseSDK.off('messages'); 
	} 
}

export default ChatScreen;
