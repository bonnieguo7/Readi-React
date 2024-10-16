// /src/screens/Profile.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Text style={styles.name}>Jane Doe</Text>
        <Text style={styles.subtext}>Member since June 2022</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statBlock}>
            <Text style={styles.statNumber}>150</Text>
            <Text style={styles.subtext}>Followers</Text>
          </View>
          <View style={styles.circle}></View>
          <View style={styles.statBlock}>
            <Text style={styles.statNumber}>400</Text>
            <Text style={styles.subtext}>Following</Text>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Read')}>
        <Text style={styles.buttonText}>Read</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Want to Read')}>
        <Text style={styles.buttonText}>Want to Read</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Recommendations')}>
        <Text style={styles.buttonText}>Recommendations</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DAEFFF',
        justifyContent: 'center',
      },
      profileCard: {
        backgroundColor: '#fff',
        padding: 20,
        marginHorizontal: 30,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
      },
      name: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
      },
      subtext: {
        color: 'gray',
        textAlign: 'center',
        marginBottom: 10,
      },
      statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 20,
      },
      statBlock: {
        alignItems: 'center',
      },
      statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'gray',
      },
      button: {
        backgroundColor: '#fff',
        padding: 15,
        marginHorizontal: 30,
        marginVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
      },
      buttonText: {
        textAlign: 'left',
        fontWeight: '600',
      },
      recommendations: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      recommendationText: {
        fontSize: 30,
        fontWeight: 'bold',
      },
});

export default Profile;
