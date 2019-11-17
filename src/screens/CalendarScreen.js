import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, TextInput } from 'react-native';
import { Calendar, CalendarList, Agenda, AgendaContainer } from 'react-native-calendars';
import firebaseSDK from '../config/firebaseSDK';


class CalendarScreen extends React.Component {
    state = {
        workout: {
            muscleGroup: 'TEST',
            set: '100',
            reps: '300'
        },
        nutrition: 'food',
        selectedDay: '',
        targetEmail: 'Chris@gmail.com',
    }

    daySelected = (setDay) => {
        this.setState({
            selectedDay: setDay
        })
    }

    addToCalendar = (date) => {

        const { workout, nutrition, targetEmail } = this.state;

        const current_user_email = firebaseSDK.email;
        var userEmail = current_user_email.toLowerCase();
        var partnerEmail = targetEmail.toLowerCase();

        userEmail = userEmail.replace(/\./g, ',');
        partnerEmail = partnerEmail.replace(/\./g, ',');

        firebaseSDK.addCalendarToUser(userEmail, date, workout, nutrition)

        firebaseSDK.addCalendarToUser(partnerEmail, date, workout, nutrition)
    }

    addPartner = () => {

        console.log("add partner hit")
        const { targetEmail } = this.state;

        const current_user_email = firebaseSDK.email;
        var userEmail = current_user_email.toLowerCase();
        var partnerEmail = targetEmail.toLowerCase();

        userEmail = userEmail.replace(/\./g, ',');
        partnerEmail = partnerEmail.replace(/\./g, ',');

        firebaseSDK.addPartnerToUser(userEmail, partnerEmail)
    }

    getFromCalendar = (date) => {

        const { workout, nutrition } = this.state;

        const current_user_email = firebaseSDK.email;
        var userEmail = current_user_email.toLowerCase();
        userEmail = userEmail.replace(/\./g, ',');

        firebaseSDK.getCalenderInfo(userEmail).then(data => {
            console.log("data from the client side --", data);

            for (let i = 0; i < data.length; i++) {
                if (data[i].appointmentDate == date) {
                    this.setState({
                        workout: data[i].workout,
                        nutrition: data[i].nutrition,
                    })
                }
            }
            console.log("nutrition:", data[0].nutrition);
        })

    }

    render() {
        const { workout, nutrition } = this.state;
        return (
            <View>
                <SafeAreaView>
                    <Calendar
                        // Collection of dates that have to be marked. Default = {}
                        markedDates={{
                            '2019-10-16': { marked: true, },
                            '2019-10-17': { marked: true },
                            '2019-10-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
                        }}
                        // onDayPress={(day) => {console.log("selected day", day.dateString)}}
                        onDayPress={day => this.addToCalendar(day.dateString)}
                        // onDayPress={day => this.getFromCalendar(day.dateString)}

                    />
                </SafeAreaView>

                <View style={styles.container}>
                    <Button title="Add Partner" onPress={this.addPartner}> </Button>
                    <View style={styles.card}>
                        <Text style={styles.title}>Monday: Chest</Text>
                        <Text style={styles.subtitle}>- BF Percentage Measurement Before Workout</Text>
                        <Text style={styles.subtitle}>- 5 Minute Meeting: October recap.</Text>
                        <Text style={styles.subtitle}>- {this.state.selectedDay} </Text>
                        <Text style={styles.subtitle}>- Workout Group {workout.muscleGroup} </Text>
                        <Text style={styles.subtitle}>- Sets {workout.set} </Text>
                        <Text style={styles.subtitle}>- Reps {workout.reps} </Text>
                        <Text style={styles.subtitle}>- Nutrition {nutrition} </Text>
                    </View>
                </View>
            </View>
        );
    }
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
        padding: 5
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