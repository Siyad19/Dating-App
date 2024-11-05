import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, Alert } from 'react-native';

export default function ForgotPassword({navigation}) {
    const [email, setEmail] = useState('');

    const handleReset = async () => {
         Keyboard.dismiss()
        const verify = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!verify.test(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address');
            return;
        }
        try {
            const response = await axios.post('https://71d8-2409-40f2-2a-b687-b8d7-9ee7-31c0-a18c.ngrok-free.app/user/forget-password',{
                email,
            },{
                headers:{
                    'Content-Type' : 'application/json',
                },
            });
            if (response.data.status === 'success') {
                Alert.alert('Success', response.data.message);
                navigation.navigate('Reset-Password');
                
              } else {
                Alert.alert('Error', response.data.message);
              }
        }
        catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'An error occurred');
        }
    }
    return (
        <View style={styles.container}>
            
            <TextInput
                style={[styles.input, styles.BoxShadow, styles.androidShadow]}
                placeholder="Enter your email"
                placeholderTextColor="#B7B7B7"
                value={email}
                onChangeText={setEmail}
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