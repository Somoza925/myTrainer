import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Calendar, CalendarList, Agenda, AgendaContainer } from 'react-native-calendars';


const CalendarScreen = () => {

    return (
        <SafeAreaView >
            <Calendar
                // Collection of dates that have to be marked. Default = {}
                markedDates={{
                    '2019-10-16': { marked: true, },
                    '2019-10-17': { marked: true },
                    '2019-10-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
                }}
            />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({});


export default CalendarScreen;