import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {getEmail} from '../auth/auth';

const HomeScreen = () => {	

	const[email, setEmail]=  useState('');

	useEffect(() => { // use this function one time when the component runs
    	getEmail()
      		.then(res => setEmail(JSON.stringify(res.email).replace(/['"]+/g, '')))
			  .catch(err => alert("An error occurred"));
    }, []);
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>This is a home screen with {email}</Text> 
		</View>
	);
}


const styles = StyleSheet.create({});


export default HomeScreen;