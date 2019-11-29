import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, TextInput } from 'react-native';
import { Calendar, CalendarList, Agenda, AgendaContainer, LocaleConfig } from 'react-native-calendars';
import firebaseSDK from '../config/firebaseSDK';
import firebase from 'firebase';
import AddExercise from '../components/AddExercise';

const CalendarScreen = ({ navigation }) => {

    var user = firebase.auth().currentUser;
    var email = user.email;
    var partnerEmail;
    var markedDay;

    const [trainerEmail, setTrainerEmail] = useState('');
    const [workout, setWorkout] = useState('');
    const [nutrition, setNutrition] = useState('');
    const [selectedDay, setSelectedDay] = useState('');

    var userEmail = email.replace(/\./g, ',');
    firebase.database().ref('/users/' + userEmail).once('value').then(
        function (snapshot) {
            partnerEmail = snapshot.val().partnerEmail;
            setTrainerEmail(partnerEmail);
        }
    );


    const shareCalendar = (date) => {
        var tempPartnerEmail = trainerEmail.toLowerCase();
        tempPartnerEmail = tempPartnerEmail.replace(/\./g, ',');
        console.log('We are in share calendar', tempPartnerEmail);
        firebaseSDK.addCalendarToUser(tempPartnerEmail, date, workout, nutrition);
    }

    const getFromCalendar = (date) => {
        const current_user_email = firebaseSDK.email;
        var userEmail = current_user_email.toLowerCase();
        userEmail = userEmail.replace(/\./g, ',');
        setSelectedDay(date);
        markedDay = "'" + selectedDay + "'"
        console.log(markedDay);

        firebaseSDK.getCalenderInfo(userEmail).then(data => {
            // console.log("data from the client side --", data);
            for (let i = 0; i < data.length; i++) {
                if (data[i].appointmentDate.date == date) {
                    setWorkout(data[i].workout);
                    setNutrition(data[i].nutrition);
                    setSelectedDay(data[i].appointmentDate.date);
                }
                else if (data[i].appointmentDate.date != date) {
                    setWorkout(' ');
                    setNutrition(' ');
                    setSelectedDay(date);
                }
            }
            // console.log("nutrition:", data[0].nutrition);
        })
    }

    const makeAppointment = (date, time, workout) => {
        var userEmail = email.toLowerCase();
        userEmail = userEmail.replace(/\./g, ',');
        firebaseSDK.setAppointment(userEmail, date, time, workout);
    }

    return (
        <View>
            <SafeAreaView>
                <Calendar
                    onDayPress={day => getFromCalendar(day.dateString)}
                    markedDates={{[selectedDay]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}}}
                />
            </SafeAreaView>
            <View style={styles.container}>
                <View style={styles.card}>
                    <AddExercise
                        date={selectedDay}
                    />
                </View>
                <View style={styles.card}>
                    <Button title="share" onPress={() => shareCalendar(selectedDay)} ></Button>
                    <Text style={styles.subtitle}>- {selectedDay} </Text>
                    <Text style={styles.subtitle}>- Workout Group - {workout.muscleGroup} </Text>
                    <Text style={styles.subtitle}>- Workout Name - {workout.name} </Text>
                    <Text style={styles.subtitle}>- Number of Sets - {workout.sets} </Text>
                    <Text style={styles.subtitle}>- Number of Reps - {workout.reps} </Text>
                    <Text style={styles.subtitle}>- Nutrition {nutrition} </Text>
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