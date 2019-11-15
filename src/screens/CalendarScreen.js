import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, TextInput } from 'react-native';
import { Calendar, CalendarList, Agenda, AgendaContainer } from 'react-native-calendars';


class CalendarScreen extends React.Component {
    state = {
        workout: 'chest',
        selectedDay: ''
    }

    daySelected = (setDay) => {
        this.setState({
            selectedDay: setDay
        })
    }


    render() {
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
                        // onDayPress={(day) => {console.log("selected day", day.day)}}
                        onDayPress = {day => this.daySelected(day.day)}
                        

                    />
                </SafeAreaView>

                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text style={styles.title}>Monday: Chest</Text>
                        <Text style={styles.subtitle}>- BF Percentage Measurement Before Workout</Text>
                        <Text style={styles.subtitle}>- 5 Minute Meeting: October recap.</Text>
                        <Text style={styles.subtitle}>- {this.state.selectedDay} </Text>
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