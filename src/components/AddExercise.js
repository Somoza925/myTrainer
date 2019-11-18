import React, { Component, useState, setState } from 'react';
import { Dimensions, TextInput, View, Modal, Text, TouchableHighlight, Alert, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import firebaseSDK from '../config/firebaseSDK';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { reset } from 'expo/build/AR';

const AddExercise = (date, { navigation }) => {

    // console.log(date)
    var user = firebase.auth().currentUser;
    var email = user.email;

    const [modalVisible, setModalVisible] = useState(false);
    const [muscleGroup, setMuscleGroup] = useState('');
    const [name, setName] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');


    const addToCalendar = (date, muscleGroup, name, sets, reps) => {
        var userEmail = email.toLowerCase();
        userEmail = userEmail.replace(/\./g, ',');
        nutrition = 'test'
        firebaseSDK.addCalendarToUser(userEmail, date, { muscleGroup, name, sets, reps }, nutrition)
    }

    resetParams = () => {
        setMuscleGroup('');
        setName('');
    }

    handleAddExercise = () => {
        console.log('Event fields were successfully updated!');
        console.log('muscleGroup: ' + muscleGroup);
        console.log('name: ' + name);
        console.log('sets: ' + sets);
        console.log('reps: ' + reps);
        addToCalendar(date, muscleGroup, name, sets, reps);
        setModalVisible(!modalVisible);
        () => navigation.navigate('Calendar');
        resetParams();
    }

    return (
        <View>
            <View style={styles.createEventBtn}>
                <Button
                    title='Add Exercise'
                    type='solid'
                    onPress={() => setModalVisible(!modalVisible)}
                    stlye={styles.buttons}
                />
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View>
                    <View style={styles.modalContainer}>
                        <View style={{ marginBottom: 10, borderBottomWidth: 0.5, borderBottomColor: 'gray' }}>
                            <Text style={styles.textTitle}>Create an Exercise</Text>
                        </View>
                        <TextInput
                            style={styles.modalTextInput}
                            placeholder="Muscle Group"
                            onChangeText={setMuscleGroup}
                            value={muscleGroup}
                        />
                        <TextInput
                            style={styles.modalTextInput}
                            placeholder="Exercise Name"
                            onChangeText={setName}
                            value={name}
                        />
                        <TextInput
                            style={styles.modalTextInput}
                            placeholder="# of Sets"
                            onChangeText={setSets}
                            value={sets}
                        />
                        <TextInput
                            style={styles.modalTextInput}
                            placeholder="# of Repetitions"
                            onChangeText={setReps}
                            value={reps}
                        />
                        <View style={styles.modalRow}>
                            <Button
                                title='Cancel'
                                type='solid'
                                onPress={setModalVisible}
                                stlye={styles.buttons} />
                            <Button
                                title='Add Exercise'
                                type='solid'
                                onPress={this.handleAddExercise}
                                stlye={styles.buttons} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    createEventBtn: {
        display: 'flex',
        // flexDirection: 'row-reverse',
        alignItems: 'center'
    },
    modalContainer: {
        backgroundColor: '#fff',
        marginTop: Dimensions.get('window').height * 0.25,
        marginHorizontal: Dimensions.get('window').width * 0.05,
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 5,
        borderWidth: 4,
        padding: 15,
        elevation: 3,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 200
    },
    modalRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        marginHorizontal: 20
    },
    modalButtons: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttons: {
        flex: 1,
        // borderWidth: 1
    },
    textTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        padding: 10,
        borderBottomWidth: 1,
    },
    modalTextInput: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#E5E4EA',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#E5E4EA',
        marginHorizontal: 10,
        marginVertical: 10,
        height: 50,
        paddingHorizontal: 20,
    },
});

export default AddExercise;