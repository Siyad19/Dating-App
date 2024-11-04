import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, Alert } from 'react-native';

export default function ForgotPassword() {
    const [username, setUsername] = useState('');

    const handleReset = () => {
         Keyboard.dismiss()
        const verify = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!verify.test(username)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address');
            return;
        }
        Alert.alert('Reset link sent to email');
    }
    return (
        <View style={styles.container}>
            
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#B7B7B7"
                value={username}
                onChangeText={setUsername}
                keyboardType="email-address"
            />
            <TouchableOpacity style={styles.button} onPress={handleReset}>
                 <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 50,
        backgroundColor:"white"
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight:"bold",
        color:"#CC2B52"
    },
    input: {
        width:"100%",
        height: "5%",
        textAlign:"left",
        borderBottomWidth:1,
        borderBlockEndColor:"#373A40",
        marginBottom: 15,
    },
    button:{
        width:"100%",
        height:"7%",
        backgroundColor:"#CC2B52",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:5,
    },
    buttonText:{
        fontSize:15,
        fontWeight:"bold",
        color:"white"
    },
});