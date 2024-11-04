import React,{useState} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Keyboard } from "react-native";
import axios from 'axios';

export default function LoginScreen({navigation}){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async() => {

        try{
            const response = await axios.post('http://10.0.2.2:3000/api/user/signin',{
                username: username,
                password: password,
            },{
                headers: {'Content-Type':'application/json'}
            })
            if(response.data.status === 'ok'){
                Alert.alert('Success', response.data.message);
                console.log("User Data:", userData);
            }
        }catch(error){
            console.error('Login error', error);
            Alert.alert('Error','An error occurred!');
            console.error('Login error', error);
        }

        Keyboard.dismiss()
        const verify = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!verify.test(username)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address');
            return;
        }
        if (password.length < 4) {
            Alert.alert('Invalid Password', 'Password must be at least 6 characters long');
            return;
        }
    };

    return (
        <View style={styles.container}>
           
            <View style={styles.itemContainer}>
                
                <TextInput style={styles.inputBox}
                placeholder="Username" 
                placeholderTextColor="#B7B7B7"
                value={username}
                onChangeText={setUsername}
                keyboardType="email-address"/>

                <TextInput style={styles.inputBox}
                placeholder="Password"
                placeholderTextColor="#B7B7B7"
                value={password}
                onChangeText={setPassword}
                secureTextEntry/>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>

                <Text style={styles.link} onPress={() => navigation.navigate('Forgot-Password')}>Forgot Password?</Text>
            </View>  
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent:"center",
      paddingHorizontal: 50
      
    },
    inputBox:{
        width:"100%",
        height: "10%",
        backgroundColor:"#ffffff",
        paddingHorizontal: 10,
        marginBottom: 20,
        paddingLeft:0,
        textAlign:"left",
        borderBottomWidth:1,
        borderBlockEndColor:"#373A40",
    },
    button:{
        width:"100%",
        height:"16%",
        backgroundColor:"#CC2B52",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:5,
    },
    link: {
        marginTop: 10,
        color: 'blue',
        textAlign: 'center',
    },
    buttonText:{
        fontSize:15,
        fontWeight:"bold",
        color:"white"
    },
   
  });