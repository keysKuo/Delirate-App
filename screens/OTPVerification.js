import React, { useState, useRef, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Image,
	TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const OTPVerificationScreen = ({ navigation }) => {
	const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
	const [otp, setOTP] = useState(["", "", "", ""]);
	const logo = require("../static/delirate-main.png");
	const [msg, setMsg] = useState("");
	const route = useRoute();
	const { params } = route;
	const [token, setToken] = useState("");

	useEffect(() => {
		if (params && params.state) {
			setToken(params.state);
		}
	}, []);

	const apiUrl = "https://sud-delirate.onrender.com/account/confirm_otp";

	const headers = {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json", // or any other content type
	};

	const axiosInstance = axios.create({
		headers: headers,
	});

	const fetchData = async () => {
		try {
			const response = await axiosInstance.post(apiUrl, {
				code: otp.join(""),
			});

			const result = response.data;
			// console.log(result);
			if (result.success) {
                await AsyncStorage.setItem('token', token);
				navigation.navigate("Home");
			} else {
				setMsg("OTP invalid");
			}
		} catch (err) {
			setMsg('An error occurred');
		}
	};

	const handleOTPInputChange = (index, text) => {
		const updatedOTP = [...otp];
		updatedOTP[index] = text;
		setOTP(updatedOTP);

		if (text === "" && index > 0) {
			// Move focus back to the previous input field when text is empty
			inputRefs[index - 1].current.focus();
		} else if (text !== "" && index < 3) {
			// Move focus to the next input field
			inputRefs[index + 1].current.focus();
		}
	};

	return (
		<View style={styles.container}>
			<Image source={logo} style={styles.logo} resizeMode="contain" />
			<Text style={styles.title}>Enter the 4-digit OTP</Text>
			<View style={styles.otpContainer}>
				{otp.map((digit, index) => (
					<TextInput
						key={index}
						style={styles.otpInput}
						maxLength={1}
						keyboardType="numeric"
						value={digit}
						onChangeText={(text) =>
							handleOTPInputChange(index, text)
						}
						ref={inputRefs[index]}
					/>
				))}
			</View>
			<Text style={styles.alert}>{msg}</Text>
			<TouchableOpacity
				style={[
					styles.submitButton,
					{ opacity: otp.join("").length === 4 ? 1 : 0.5 },
				]}
				onPress={fetchData}
				disabled={otp.join("").length !== 4}
			>
				<Text style={styles.buttonText}>Verify</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 18,
		marginBottom: 20,
	},
	otpContainer: {
		flexDirection: "row",
	},
	otpInput: {
		width: 50,
		height: 50,
		borderWidth: 1,
		borderRadius: 5,
		fontSize: 20,
		textAlign: "center",
		marginHorizontal: 5,
		marginBottom: 30,
	},
	submitButton: {
		backgroundColor: "#313552",
		width: "50%",
		height: 40,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 15,
	},
	logo: {
		width: "50%",
		height: 100,
		marginBottom: 20,
	},
	buttonText: {
		color: "white",
	},
	alert: {
		color: "lightcoral",
	},
});

export default OTPVerificationScreen;
