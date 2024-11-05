import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import axios from "axios";

export default function ResetPassword(){
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');

    const handleChangePassword = async () =>{
        try {
            const response = await axios.post('https://71d8-2409-40f2-2a-b687-b8d7-9ee7-31c0-a18c.ngrok-free.app/user/forget-password', {
              token,
              password,
            }, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            if (response.data.message === 'Update Successful') {
              Alert.alert('Success', 'Password reset successful!');
              
            } else {
              Alert.alert('Error', response.data.message);
            }
          } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'An error occurred');
          }
    }
    return(
        <View style={styles.Container}>
            <Text>Create a new password.</Text>
            <TextInput 
            style={styles.InputBox}
            placeholder="Enter the Token"
            placeholderTextColor="#B7B7B7"
            value={token}
            onChangeText={setToken}
            />
            <TextInput
            style={styles.InputBox}
            placeholder="Enter new password"
            placeholderTextColor="#B7B7B7"
            value={password}
            onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.ButtonStyle} onPress={handleChangePassword}>
                <Text style={styles.ButtonText} >Change Password</Text>
            </TouchableOpacity>
        </View>
        
    )
}

const styles = StyleSheet.create({
    Container:{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        backgroundColor:"white"
    },
    InputBox:{
        width:"100%",
        height: "8%",
        backgroundColor:"#ffffff",
        paddingHorizontal: 10,
        marginBottom: 20,
        paddingLeft:10,
        textAlign:"left",
        borderRadius:15,
    },
    ButtonStyle:{
        width:"100%",
        height:"8%",
        backgroundColor:"#CC2B52",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:15,
    },
    ButtonText:{
        fontSize:15,
        fontWeight:"bold",
        color:"white"
    }

})