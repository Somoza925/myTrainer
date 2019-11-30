import React, { Component, useState, setState } from 'react';
import { Dimensions, TextInput, View, Modal, Text, TouchableHighlight, Alert, StyleSheet, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import firebaseSDK from '../config/firebaseSDK';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { reset } from 'expo/build/AR';
import DatePicker from 'react-native-datepicker';

/****************************************************************************
 * MAKE SURE YOU RUN THESE COMMANDS!!!!!!
 * npm install react-native-datepicker --save
****************************************************************************/

const AddAppointment = ({ navigation }) => {
    var user = firebase.auth().currentUser;
    var email = user.email;

    var userEmail = email.toLowerCase();
    userEmail = userEmail.replace(/\./g, ',');

    const [modalVisible, setModalVisible] = useState(false);
    const [notes, setNotes] = useState('');
    const [apptDate, setApptDate] = useState('');
    const [apptTime, setApptTime] = useState('');
    const [dateSelected, setDateSelected] = useState('2019-01-01');
    const [trainerEmail, setTrainerEmail] = useState('');


    // const [selectedHours, setSelectedHours] = useState('');
    // const [selectedMinutes, setSelectedMinutes] = useState('');

    handleAddAppointment = () => {
        // TODO: Ready to be sent to database!
        setModalVisible(!modalVisible);
        console.log('Event fields were successfully updated!');
        console.log('apptDate: ' + apptDate);
        console.log('apptTime: ' + apptTime);
        console.log('muscleGroup: ' + notes);
        firebaseSDK.setAppointment(userEmail, apptDate, apptTime, notes);
        firebaseSDK.setAppointment(trainerEmail.replace(/\./g, ','), apptDate, apptTime, notes);
    }

    var userEmail = email.replace(/\./g, ',');
	firebase.database().ref('/users/' + userEmail).once('value').then(
		function (snapshot) {
			partnerEmail = snapshot.val().partnerEmail;
			setTrainerEmail(partnerEmail);
		}
    );

    return (
        <View>
            <View style={styles.createEventBtn}>
                <Button
                    title='Create Appointment'
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
                            <Text style={styles.textTitle}>Create an Appointment</Text>
                            <Text style={styles.textSubTitle}>with {trainerEmail} </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <DatePicker
                                date={apptDate}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate="2019-01-01"
                                maxDate="2020-12-31"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                }}
                                onDateChange={setApptDate}
                            />
                            <DatePicker
                                date={apptTime}
                                mode="time"
                                placeholder="select time"
                                // format="hh:mm"
                                minuteInterval={10}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                }}
                                onDateChange={setApptTime}
                            />
                        </View>
                        <TextInput
                            style={styles.modalTextInput}
                            placeholder="Notes"
                            onChangeText={setNotes}
                            value={notes}
                        />
                        <View style={styles.modalRow}>
                            <Button
                                title='Cancel'
                                type='solid'
                                onPress={setModalVisible}
                                stlye={styles.buttons} />
                            <Button
                                title='Create'
                                type='solid'
                                onPress={this.handleAddAppointment}
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
    textSubTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
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

export default AddAppointment;