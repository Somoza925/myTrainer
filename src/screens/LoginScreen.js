import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

const LoginScreen = ({ navigation }) => {
    state = {
        username: '',
        password: '',
        errorMessage: null
	}
  
	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<Text style={styles.title}>myTrainer</Text>
				<TextInput
					style={styles.inputField}
					placeholder='name...'
					onChangeText={(username) => this.setState({username})}
					value={this.state.username}
				/>
				<TextInput
					style={styles.inputField}
					placeholder='Password...'
					onChangeText={(password) => this.setState({password})}
					value={this.state.password}
				/>
				<View style={styles.buttonRow}>
					<Button
						title='Log in'
						type='solid'
						onPress={this.onPress}
						style={styles.buttons}
					/>
					<Button
						title='Sign up'
						type='solid'
						onPress={this.onPress}
						stlye={styles.buttons}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 75,
        paddingVertical: 175,
        flex: 1
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        shadowOpacity: 5,
        shadowColor: 'gray',
        shadowOffset: {
            width: -3,
            height: 3
        },
        padding: 5
    },
    title: {
        fontSize: 46,
        textAlign: 'center',
        paddingBottom: 30,
    },
    inputField: {
        height: 35,
        paddingLeft: 5,
        marginBottom: 5,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: 'gray'
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        paddingTop: 10,
    },
    buttons: {
        flex: 1,
        // borderWidth: 1
	},
});


export default LoginScreen;