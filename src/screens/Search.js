import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const Search = () => {
    const [value, onChangeText] = React.useState('Useless Multiline Placeholder');
    return (
        <View style={styles.container}>
        <View
            style={{
                backgroundColor: 'white',
                borderBottomColor: '#000000',
                borderBottomWidth: 1,
                margin: 30
            }}>
                <TextInput
                    editable
                    multiline
                    numberOfLines={4}
                    maxLength={40}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                    style={{padding: 10}}
                />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DAEFFF'
    }
})

export default Search;