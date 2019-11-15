import React from 'react';
import { View, StyleSheet, TextInput, Button} from 'react-native';



const SearchBar = ({term, onTermChange, onTermSubmit}) => {
    return(
        <View style = {styles.backgroundStyle}>
            <TextInput
                style = {styles.inputStyle}
                placeholder = "User Email"
                value = {term}
                onChangeText = {onTermChange} // SAME AS onChangeText = {(newTerm) => onTermChange(newTerm)}
                onEndEditing = {onTermSubmit} // SAME AS onEndEditing = {() => onTermSubmit()}
            />
        </View>);
}

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginTop: 13
    },
    inputStyle: {
        flex: 1,
        fontSize: 18,
        paddingLeft: 5
    }, 
    iconStyle: {
        fontSize: 35,
        alignSelf: 'center',
        marginHorizontal: 15
    }
});

export default SearchBar;