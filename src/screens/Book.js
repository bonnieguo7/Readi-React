import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import user from '../models/User';

const Book = ({ route, navigation }) => {
  const { title, author, genre, coverImage, description, id } = route.params;
  const [isRead, setIsRead] = useState(false);
  const [isWantToRead, setIsWantToRead] = useState(false);

  useEffect(() => {
    const checkBookStatus = async () => {
      await user.initialize();
      const status = user.getBookStatus(id);
      setIsRead(status === 'read');
      setIsWantToRead(status === 'want-to-read');
    };
    checkBookStatus();
  }, [id]);

  const handleMarkAsRead = async () => {
    try {
      console.log('Attempting to add book to read list:', { id, title, author, genre, coverImage });
      await user.initialize();
      await user.addToReadBooks({
        id,
        title,
        author,
        genre,
        coverImage,
        description
      });
      console.log('Successfully added book to read list');
      setIsRead(true);
      setIsWantToRead(false); // Remove from want to read if it was there
      Alert.alert(
        'Success',
        'Added to Read',
        [
          {
            text: 'OK',
            onPress: () => console.log('Alert dismissed')
          }
        ]
      );
    } catch (error) {
      console.error('Error adding book to read list:', error);
      Alert.alert(
        'Error',
        'Failed to add book to read list',
        [
          {
            text: 'OK',
            onPress: () => console.log('Error alert dismissed')
          }
        ]
      );
    }
  };

  const handleWantToRead = async () => {
    try {
      console.log('Attempting to add book to want to read list:', { id, title, author, genre, coverImage });
      await user.initialize();
      await user.addToWantToRead({
        id,
        title,
        author,
        genre,
        coverImage,
        description
      });
      console.log('Successfully added book to want to read list');
      setIsWantToRead(true);
      setIsRead(false); // Remove from read if it was there
      Alert.alert(
        'Success',
        'Added to Want to Read',
        [
          {
            text: 'OK',
            onPress: () => console.log('Alert dismissed')
          }
        ]
      );
    } catch (error) {
      console.error('Error adding book to want to read list:', error);
      Alert.alert(
        'Error',
        'Failed to add book to want to read list',
        [
          {
            text: 'OK',
            onPress: () => console.log('Error alert dismissed')
          }
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Static Top Section */}
      <View style={styles.topSection}>
        <View style={styles.bookHeader}>
          <Image 
            source={{ uri: coverImage }}
            style={styles.coverImage}
          />
          <View style={styles.bookInfo}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.author}>{author} | {genre}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingLabel}>Average rating:</Text>
              <Text style={styles.rating}>4.2</Text>
              <Text style={styles.star}>★</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.readButton, isRead && styles.readButtonActive]}
                onPress={handleMarkAsRead}
                disabled={isRead}
              >
                <Text style={styles.readButtonText}>
                  {isRead ? 'Already Read!' : 'I\'ve read this!'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.wantToReadButton, isWantToRead && styles.wantToReadButtonActive]}
                onPress={handleWantToRead}
                disabled={isWantToRead}
              >
                <Text style={styles.wantToReadButtonText}>
                  {isWantToRead ? 'Want to Read!' : 'Want to read this?'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.divider} />
      </View>

      {/* Scrollable Content Section */}
      <ScrollView style={styles.scrollContent}>
        <View style={styles.contentSection}>
          {/* Description Section */}
          <Text style={styles.sectionTitle}>Description:</Text>
          <Text style={styles.description}>
            {description || 'No description available'}
          </Text>
          <View style={styles.divider} />

          {/* Review Section */}
          <View style={styles.reviewHeader}>
            <Text style={styles.sectionTitle}>Rachel's Review</Text>
            <Text style={styles.communityReviews}>Community Reviews</Text>
          </View>
          <Text style={styles.review}>
            Review: Good characters but it was boring. I liked Lord of the Rings Better. I watched the show so I found the pacing to be slow and the story lacking in excitement.

            I found myself comparing it to Lord of the Rings which, despite being a different genre, managed to capture my attention with its epic storyline and immersive world.
          </Text>

          {/* Book Details */}
          <View style={styles.bookDetails}>
            <Text style={styles.detailText}>Format: Audiobook</Text>
            <Text style={styles.detailText}>Favorite characters: Koh Hansu</Text>
            <View style={styles.dateContainer}>
              <Text style={styles.detailText}>Started: Aug 2, 2024</Text>
              <Text style={styles.detailText}>Finished: Aug 6, 2024</Text>
            </View>
          </View>

          {/* Tags Section */}
          <View style={styles.tagsContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Fiction</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Asian-lit</Text>
            </View>
          </View>

          {/* Submitted by Section */}
          <View style={styles.submitterContainer}>
            <View style={styles.profileImage} />
            <Text style={styles.submitterText}>Submitted by Rachel</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// Add navigation options
Book.navigationOptions = {
  title: 'Book Detail',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    backgroundColor: '#fff',
  },
  bookHeader: {
    flexDirection: 'row',
    padding: 15,
  },
  coverImage: {
    width: 100,
    height: 150,
    marginRight: 15,
    resizeMode: 'contain',
  },
  bookInfo: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  author: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 5,
  },
  rating: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginRight: 5,
  },
  star: {
    color: '#FFD700',
    fontSize: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 15,
  },
  scrollContent: {
    flex: 1,
  },
  contentSection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  communityReviews: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
  },
  review: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  bookDetails: {
    marginBottom: 15,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  tag: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  tagText: {
    fontSize: 12,
  },
  submitterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    borderWidth: 1,
    borderColor: '#666',
  },
  submitterText: {
    fontSize: 14,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  readButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  readButtonActive: {
    backgroundColor: '#8BC34A',
  },
  readButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  wantToReadButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  wantToReadButtonActive: {
    backgroundColor: '#64B5F6',
  },
  wantToReadButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Book;

