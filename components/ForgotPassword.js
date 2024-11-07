import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, Alert } from 'react-native';

export default function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState('');

    const handleReset = async () => {
        Keyboard.dismiss()
        const verify = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!verify.test(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address');
            return;
        }
        try {
            const response = await axios.post('https://141a-2401-4900-4120-8014-31d7-fbe6-a0d3-3d35.ngrok-free.app/user/forget-password', {
                email,
            }, {
                headers: {
                    'Content-Type': 'application/json',
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
            Alert.alert('Error', error.response?.data?.message || 'Something went wrong!');
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.headerText}>
                <Text style={styles.headerText1}>Forgot password?</Text>
                <Text style={styles.headerText2}>We'll send you reset instructions.</Text>
            </View>

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
        backgroundColor: "white",
        paddingHorizontal: 30,
    },
    headerText: {
        alignItems: "center",
        padding:20,
        marginTop:160
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
    input: {
        width: "100%",
        height: "7%",
        backgroundColor: "#ffffff",
        paddingHorizontal: 10,
        marginBottom: 20,
        marginTop:150,
        paddingLeft: 15,
        textAlign: "left",
        borderRadius: 15,
        borderColor: "#CC2B52",
        borderWidth: 1
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
    button: {
        width: "100%",
        height: "7%",
        backgroundColor: "#CC2B52",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white"
    },
});