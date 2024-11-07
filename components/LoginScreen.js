import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Keyboard, StatusBar} from "react-native";
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
      const response = await axios.post('https://141a-2401-4900-4120-8014-31d7-fbe6-a0d3-3d35.ngrok-free.app/user/signin', {
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
        Alert.alert('Login Error', 'wrong Email address');
      } else if (error.request) {
        Alert.alert('Network Error', 'No response from server. Please check your connection.');
      } else {
        Alert.alert('Error', 'An error occurred. Please try again later.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar/>
      <View style={styles.headerText}>
        <Text style={styles.headerText1}>Login Here</Text>
        <Text style={styles.headerText2}>Welcome back you've</Text>
        <Text style={styles.headerText2}>been missed!</Text>
      </View>
        <TextInput
          style={[styles.inputBox, styles.BoxShadow, styles.androidShadow]}
          placeholder="Email"
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

        <Text style={styles.link} onPress={() => navigation.navigate('Forgot-Password')}>
          Forgot your password?
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerStyle}>
          <Text style={styles.footerText}>Create new account</Text>
        </TouchableOpacity>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 30,
  },
  headerText: {
    alignItems: "center",
    padding:30,
    marginTop:150,
    marginBottom:50,
  },
  headerText1: {
    fontWeight: "bold",
    fontSize: 28,
    color: "#CC2B52",
    padding: 10
  },
  headerText2: {
    fontSize: 18,
    fontWeight:'400'
  },
  inputBox: {
    width: "100%",
    height: "7%",
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
    marginBottom: 20,
    paddingLeft: 20,
    textAlign: "left",
    borderRadius: 15,
    borderColor: "#CC2B52",
    borderWidth: 1
  },
  BoxShadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  androidShadow: {
    elevation: 10,
  },
  button: {
    width: "100%",
    height: "7%",
    backgroundColor: "#CC2B52",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  link: {
    marginBottom:15,
    color: 'blue',
    textAlign: 'right',
    fontWeight:"300"
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  footerStyle:{
    alignItems:'center',
    marginTop:50
  },
  footerText:{
    fontWeight:"500",
    fontSize:15
  },
});
