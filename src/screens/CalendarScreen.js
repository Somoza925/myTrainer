import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, TextInput } from 'react-native';
import { Calendar, CalendarList, Agenda, AgendaContainer, LocaleConfig } from 'react-native-calendars';
import firebaseSDK from '../config/firebaseSDK';
import firebase from 'firebase';
import AddAppointment from '../components/AddAppointment';

const CalendarScreen = ({ navigation }) => {

    var user = firebase.auth().currentUser;

    const [selectedDay, setSelectedDay] = useState('');
    const [markedDay, setMarkedDay] = useState('');
    const [yesDay, setYesDay] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [appointmentNotes, setAppointmentNotes] = useState('');


    const getFromCalendar = (date) => {
        console.log("we are in get from calendar")
        const current_user_email = firebaseSDK.email;
        var userEmail = current_user_email.toLowerCase();
        userEmail = userEmail.replace(/\./g, ',');
        setMarkedDay(date);

        firebaseSDK.getCalenderInfo(userEmail).then(data => {
            for (let i = 0; i < data.length; i++) {
                console.log("Current date in data set", data[i].appointmentDate);
                if (data[i].appointmentDate === date) {
                    setAppointmentTime(data[i].appointmentTime);
                    setAppointmentNotes(data[i].appointmentNotes);
                    setSelectedDay('You have an appointment on ' + data[i].appointmentDate);
                    setYesDay(data[i].appointmentDate);
                    break;
                }
                else if (data[i].appointmentDate !== date) {
                    setAppointmentTime('N/A');
                    setAppointmentNotes('N/A');
                    setSelectedDay('You do not have an appointment on ' + date);
                    setYesDay('');
                }
            }
        })
    }
    return (
        <View>
            <SafeAreaView>
                <Calendar
                    onDayPress={(day) => getFromCalendar(day.dateString)}
                    markedDates={{
                        [markedDay]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' },
                        [yesDay]: { selected: true, disableTouchEvent: true, selectedColor: 'green' }
                    }}
                />
            </SafeAreaView>
            <View style={styles.container}>
                <AddAppointment></AddAppointment>
                <View style={styles.card}>
                    <Text style={styles.subtitle}> {selectedDay} </Text>
                    <Text style={styles.subtitle}> Appointment Time --- {appointmentTime} </Text>
                    <Text style={styles.subtitle}> Appointment Notes --- {appointmentNotes} </Text>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        margin: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        backgroundColor: '#ffffff',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        shadowOpacity: 5,
        shadowColor: 'gray',
        shadowOffset: {
            width: -1.2,
            height: 1.5
        },
        padding: 5,
        marginVertical: 20
    },
    title: {
        fontSize: 26,
        textAlign: 'center',
        paddingBottom: 30,
    },
    subtitle: {
        fontSize: 18,
        paddingBottom: 10
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


export default CalendarScreen;