import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Recommendations = () => {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Recommendations</Text>
            </View>
            <View style={styles.books}>
                <View style={styles.bookContainer}>
                    <View style={styles.circle}>
                        <Text style={styles.number}>1</Text>
                    </View>
                    <Image source={{uri: 'https://books.google.com/books/content?id=NLVPEAAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'}}
                        style={styles.coverImage}>
                    </Image>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.bookTitle}>The Girl on the Train</Text>
                        <Text style={styles.bookAuthor}>Paula Hawkins | Thriller</Text>
                    </View>
                </View>
                <View style={styles.bookContainer}>
                    <View style={styles.circle}>
                        <Text style={styles.number}>2</Text>
                    </View>
                    <Image source={{uri: 'https://books.google.com/books/content?id=Eka9DAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api'}}
                        style={styles.coverImage}>
                    </Image>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.bookTitle}>It Ends With Us</Text>
                        <Text style={styles.bookAuthor}>Colleen Hoover | Romance</Text>
                    </View>
                </View>
                <View style={styles.bookContainer}>
                    <View style={styles.circle}>
                        <Text style={styles.number}>3</Text>
                    </View>
                    <Image source={{uri: 'https://books.google.com/books/content?id=jBaNEAAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'}}
                        style={styles.coverImage}>
                    </Image>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.bookTitle}>Red Rising</Text>
                        <Text style={styles.bookAuthor}>Pierce Brown | Science Fiction</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DAEFFF'
    },

    titleContainer: {
        backgroundColor: 'white',
        margin: 30,
        borderRadius: 15,
    },

    bookContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        height: 80
    },

    title: {
        fontFamily: 'Times New Roman',
        fontSize: 30,
        textAlign: 'center',
        padding: 20,
        color: '#616161'
    },

    circle: {
        backgroundColor: 'rgba(255, 161, 51, 0.8)',
        width: 50,
        height: 50,
        borderRadius: 50, 
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginBottom: 30,
        borderWidth: 3,
        borderColor: 'white'
    },

    number: {
        color: 'white',
        fontFamily: 'Times New Roman',
        fontSize: 24
    },

    bookTitle: {
        color: '#616161',
        fontFamily: 'Times New Roman',
        fontSize: 18
    },

    bookAuthor: {
        color: '#B3B3B3',
        fontSize: 13
    },

    detailsContainer: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center'
    },

    coverImage: {
        width: 50,
        height: 75,
        marginLeft: 20
    }
})

export default Recommendations;