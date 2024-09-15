// ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '../lib/supabaseClient'; // Import your Supabase client

const ProfileScreen = ({ navigation }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.replace('Login'); // Ensure you have a Login screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>User Profile</Text>
      {/* Display user info here */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#FF5722',
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
