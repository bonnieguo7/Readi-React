import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import user from '../models/User';

const WantToRead = ({ navigation }) => {
  const [wantToReadBooks, setWantToReadBooks] = useState([]);

  useEffect(() => {
    const loadWantToReadBooks = async () => {
      await user.initialize();
      const books = user.getBooks('want-to-read');
      setWantToReadBooks(books);
    };
    loadWantToReadBooks();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Want to Read</Text>
      </View>
      <ScrollView style={styles.books}>
        {wantToReadBooks.map((book, index) => (
          <View key={book.id} style={styles.bookContainer}>
            <View style={styles.circle}>
              <Text style={styles.number}>{index + 1}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Book', {
              id: book.id,
              title: book.title,
              author: book.author,
              genre: book.genre,
              coverImage: book.coverImage,
              description: book.description
            })}>
              <Image 
                source={{ uri: book.coverImage }}
                style={styles.coverImage}
              />
            </TouchableOpacity>
            <View style={styles.detailsContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Book', {
                id: book.id,
                title: book.title,
                author: book.author,
                genre: book.genre,
                coverImage: book.coverImage,
                description: book.description
              })}>
                <Text style={styles.bookTitle}>{book.title}</Text>
              </TouchableOpacity>
              <Text style={styles.bookAuthor}>{book.author} | {book.genre}</Text>
            </View>
          </View>
        ))}
        {wantToReadBooks.length === 0 && (
          <Text style={styles.emptyText}>No books in your want to read list yet</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DAEFFF'
  },
  titleContainer: {
    backgroundColor: 'white',
    margin: 30,
    borderRadius: 15,
  },
  title: {
    fontFamily: 'Times New Roman',
    fontSize: 30,
    textAlign: 'center',
    padding: 20,
    color: '#616161'
  },
  books: {
    paddingHorizontal: 20,
  },
  bookContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    height: 80
  },
  circle: {
    backgroundColor: 'rgba(255, 161, 51, 0.8)',
    width: 30,
    height: 30,
    borderRadius: 50, 
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginBottom: 30,
    marginRight: -5,
    borderWidth: 2,
    borderColor: 'white'
  },
  number: {
    color: 'white',
    fontFamily: 'Times New Roman',
    fontSize: 18
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
  },
  emptyText: {
    textAlign: 'center',
    color: '#616161',
    fontFamily: 'Times New Roman',
    fontSize: 18,
    marginTop: 20
  }
});

export default WantToRead;