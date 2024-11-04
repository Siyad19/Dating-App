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
                style={[styles.input, styles.BoxShadow, styles.androidShadow]}
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
        paddingHorizontal: 30,
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
        height: "8%",
        backgroundColor:"#ffffff",
        paddingHorizontal: 10,
        marginBottom: 20,
        paddingLeft:10,
        textAlign:"left",
        borderRadius:15,
    },
    BoxShadow:{
        shadowColor:"black",
        shadowOffset:{
            width:2,
            height:2
        },
        shadowOpacity:0.8,
        shadowRadius:5
    },
    androidShadow:{
        elevation:10
    },
    button:{
        width:"100%",
        height:"8%",
        backgroundColor:"#CC2B52",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:15,
    },
    buttonText:{
        fontSize:15,
        fontWeight:"bold",
        color:"white"
    },
});