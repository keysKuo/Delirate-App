import { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TextInput , Dimensions, Button } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {  useRoute } from '@react-navigation/native';
import axios from 'axios';
import TableComponent from '../components/Table';

const FailOriginScreen = ({ navigation }) => {

    const handleClickHome = () => {
        navigation.navigate('Home');
    }
    
    return (
		<View style={styles.container}>
			<EntypoIcon name="circle-with-cross" size={50} color="#E76161" />
			<Text style={styles.text}>Your items are invalid</Text>
			<Text style={styles.header}>
				We can't verify the origin of these items
			</Text>
			<TextInput
				placeholder="Leave your email..."
				value=""
				onChangeText={(text) => {}}
                style={styles.textInput}
			/>
            <Button title='Back to homepage' onPress={handleClickHome}/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		height: Dimensions.get("window").height,
	},
	text: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 30,
		color: "#E76161",
	},
	header: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 5,
		textAlign: "center",
        width: '70%'
	},
	textInput: {
		height: "40",
		borderColor: "rgba(0,0,0,0.1)",
		borderWidth: 1,
		marginBottom: 20,
		marginTop: 20,
        borderRadius: 5,
		paddingHorizontal: 20,
		paddingVertical: 10,
		width: "80%",
	},
});

export default FailOriginScreen;
