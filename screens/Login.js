import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import Config from '../config.dev';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const logo = require('../static/delirate-main.png')
    // const apiUrl = 'https://sud-delirate.onrender.com/account/login';
    const apiUrl = Config.API_URL;

    const fetchData = async () => {
        try {
            const response = await axios.post(apiUrl + '/account/login', {
                email: email,
                password: password
            });
            
            const result = response.data;
            // console.log(result);
            if(result.success) {
                navigation.navigate('OTPVerification', {
                    state: result.token,
                });
            }
            else {
                setMsg('Account invalid');
            }
        }
        catch(err) {
            setMsg('An error occurred: ' + err);
        }
    }


    return (
		<View style={styles.container}>
			<Image
				source={logo}
				style={styles.logo}
                resizeMode='contain'
			/>
			{/* <Text style={styles.header}>Login</Text> */}
			<TextInput
				style={styles.input}
				placeholder="Email"
				value={email}
				onChangeText={(text) => setEmail(text)}
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				secureTextEntry={true}
				value={password}
				onChangeText={(text) => setPassword(text)}
			/>
            <Text style={styles.alert}>{msg}</Text>
			<TouchableOpacity style={styles.loginButton} onPress={fetchData}>
				<Text style={styles.buttonText}>Login</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f7f7f7",
	},
	logo: {
		width: "100%",
		height: 100,
		marginBottom: 20,
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#333",
	},
	input: {
		width: "80%",
		height: 40,
		borderColor: "#ddd",
		borderWidth: 1,
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
		backgroundColor: "white",
	},
	loginButton: {
		backgroundColor: "#313552",
		width: "80%",
		height: 40,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
        marginTop: 10
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
    alert: {
        color: 'lightcoral'
    }
});

export default LoginScreen;
