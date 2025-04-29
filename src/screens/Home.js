import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Home = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.linkText}>Go to Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Read')}>
          <Text style={styles.linkText}>Go to Read</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('WantToRead')}>
          <Text style={styles.linkText}>Go to Want to Read</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Recommendations')}>
          <Text style={styles.linkText}>Go to Recommendations</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Text style={styles.linkText}>Go to Search</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#DAEFFF',
    },
    linkText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'blue',
      marginBottom: 20,
    },
  });

  export default Home;