import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import axios from "axios";

export default function ResetPassword({navigation}) {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (password === '' || confirmPassword === '') {
      Alert.alert("Error", "Please fill in both password fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post('https://141a-2401-4900-4120-8014-31d7-fbe6-a0d3-3d35.ngrok-free.app/user/forget-password', {
        token,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.error === 'Invalid token') {
        Alert.alert('The token is invalid or expired');
        return;
      }

      if (response.data.success) {
        Alert.alert('Password reset successfully');
        navigation.navigate = ('Sign-In')

      } else {
        Alert.alert('Error resetting password', response.data.message || 'Please try again');
      }
      
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Something went wrong', 'Please check your internet connection and try again');
    }
    console.log('API Response:', response);

  }
  return (
    <View style={styles.Container}>

      <View style={styles.headerText}>
        <Text style={styles.headerText1}>Set new password</Text>
        <Text style={styles.headerText2}>Must be at least 6 characters.</Text>
      </View>

      <TextInput
        style={[styles.InputBox, styles.BoxShadow, styles.androidShadow]}
        placeholder="Enter the Token"
        placeholderTextColor="#B7B7B7"
        value={token}
        onChangeText={setToken}
      />
      <TextInput
        style={[styles.InputBox, styles.BoxShadow, styles.androidShadow]}
        placeholder="New password"
        placeholderTextColor="#B7B7B7"
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={[styles.InputBox, styles.BoxShadow, styles.androidShadow]}
        placeholder="Confirm password"
        placeholderTextColor="#B7B7B7"
        value={confirmPassword}
        onChangeText={setconfirmPassword}
      />

      <TouchableOpacity style={styles.ButtonStyle} onPress={handleChangePassword}>
        <Text style={styles.ButtonText} >Change Password</Text>
      </TouchableOpacity>
    </View>

  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    paddingHorizontal: 30,
    backgroundColor: "white"
  },
  InputBox: {
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
  headerText: {
    padding: 30,
    alignItems: "center",
  },
  headerText1: {
    fontWeight: "bold",
    fontSize: 28,
    color: "#CC2B52",
    padding: 10
  },
  headerText2: {
    fontSize: 18,
    fontWeight: '400'
  },
  BoxShadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 6,
      height: 6
    },
    shadowOpacity: 0.3,
    shadowRadius: 8
  },
  androidShadow: {
    elevation: 10
  },
  ButtonStyle: {
    width: "100%",
    height: "7%",
    backgroundColor: "#CC2B52",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  ButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white"
  }

})