import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import firebaseSDK from '../config/firebaseSDK';

const SignupScreen = ({ navigation }) => {
    const [fname, set_fname] = useState('');
    const [lname, set_lname] = useState('');
    const [email, set_email] = useState('');
    const [password, set_password] = useState('');

	onPressCreate = async () => {
		try {
			const user = {
                // TODO: NEED TO IMPLEMENT FIRST & LAST NAME
                // fname: fname,
                // lname: lname,
                name: fname + ' ' + lname,
				email: email,
				password: password
			};
            await firebaseSDK.createAccount(user).then(
                navigation.navigate('Login')
            );
            firebaseSDK.writeUserData(user);
		} catch ({ message }) {
			console.log('create account failed. catch error:' + message);
        }
	};

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>myTrainer</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder='email...'
                    onChangeText={set_email}
                    value={email}
                />
                <TextInput
                    style={styles.inputField}
                    placeholder='password...'
                    onChangeText={set_password}
                    value={password}
                />
                <TextInput
                    style={styles.inputField}
                    placeholder='John...'
                    onChangeText={set_fname}
                    value={fname}
                />
                <TextInput
                    style={styles.inputField}
                    placeholder='Smith...'
                    onChangeText={set_lname}
                    value={lname}
                />

                <View style={styles.buttonRow}>
                    <Button
                        title='Go back'
                        type='solid'
                        onPress={() => navigation.navigate('Login')}
                        style={styles.buttons}
                    />
                    <Button
                        title='Sign up!'
                        type='solid'
                        onPress={this.onPressCreate}
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


export default SignupScreen;