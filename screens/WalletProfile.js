import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const WalletProfileScreen = ({ navigation }) => {
  // Replace the following with actual user account data
  const userAccount = {
    username: 'john_doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1234567890',
    profileImage: require('../static/alter.png'), // Replace with the actual path
  };

  return (
    <View style={styles.container}>
      <Image source={userAccount.profileImage} style={styles.profileImage} />
      <Text style={styles.username}>{userAccount.username}</Text>
      <Text style={styles.email}>{userAccount.email}</Text>
      <Text style={styles.phoneNumber}>{userAccount.phoneNumber}</Text>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => {
          // Navigate to the edit profile screen or implement your logic
          navigation.navigate('EditProfile');
        }}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          // Implement logout logic
          // For example, navigate to the login screen or clear the authentication token
          navigation.navigate('Login');
        }}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    marginBottom: 10,
  },
  phoneNumber: {
    fontSize: 16,
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default WalletProfileScreen;
