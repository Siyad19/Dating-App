import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Keyboard } from "react-native";
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    Keyboard.dismiss();
    
    const verify = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!verify.test(username)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }
    if (password.length < 5) {
      Alert.alert('Invalid Password', 'Password must be at least 6 characters long');
      return;
    }

    try {
      const response = await axios.post('https://71d8-2409-40f2-2a-b687-b8d7-9ee7-31c0-a18c.ngrok-free.app/user/signin', {
        email: username, 
        password,
      });

      const data = response.data;

      if (data.status === 'ok') {
        Alert.alert('Login Successful', data.message);
        
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        Alert.alert('Login Error','wrong Email address');
      } else if (error.request) {
        Alert.alert('Network Error', 'No response from server. Please check your connection.');
      } else {
        Alert.alert('Error', 'An error occurred. Please try again later.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <TextInput
          style={[styles.inputBox, styles.BoxShadow, styles.androidShadow]}
          placeholder="Username"
          placeholderTextColor="#B7B7B7"
          value={username}
          onChangeText={setUsername}
          keyboardType="email-address"
        />
        
        <TextInput
          style={[styles.inputBox, styles.BoxShadow, styles.androidShadow]}
          placeholder="Password"
          placeholderTextColor="#B7B7B7"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <Text style={styles.link} onPress={() => navigation.navigate('Forgot-Password')}>
          Forgot your password?
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  inputBox: {
    width: "100%",
    height: "15%",
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
    marginBottom: 20,
    paddingLeft: 10,
    textAlign: "left",
    borderRadius: 15,
  },
  BoxShadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 10,
      height: 6,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  androidShadow: {
    elevation: 10,
  },
  button: {
    width: "100%",
    height: "16%",
    backgroundColor: "#CC2B52",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  link: {
    marginTop: 10,
    color: 'blue',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
});
