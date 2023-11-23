import React, { useState, useEffect, useRef } from "react";
import {
	Text,
	View,
	StyleSheet,
	Dimensions,
	Animated,
	Easing,
	Button,
	Alert,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import crypto from "crypto-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Config from "../config.dev";

function decryptAES(encode, secretKey) {
	let bytes = crypto.AES.decrypt(encode, secretKey);
	return JSON.parse(bytes.toString(crypto.enc.Utf8));
}

const apiUrl = Config.API_URL;

export default function QRScannerScreen({ navigation }) {
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);

	const pulseAnimation = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	useEffect(() => {
		if (!scanned) {
			// Create a pulsating animation for the aiming square
			Animated.loop(
				Animated.sequence([
					Animated.timing(pulseAnimation, {
						toValue: 1.2,
						duration: 1000,
						useNativeDriver: false,
						easing: Easing.inOut(Easing.ease),
					}),
					Animated.timing(pulseAnimation, {
						toValue: 1,
						duration: 1000,
						useNativeDriver: false,
						easing: Easing.inOut(Easing.ease),
					}),
				])
			).start();
		}
	}, [pulseAnimation]);

	const handleBarCodeScanned = async ({ type, data }) => {
		try {
			setScanned(true);
			
			if (data.startsWith(`${apiUrl}/account`)) {
				let userJSON = await AsyncStorage.getItem("user");
				let user = JSON.parse(userJSON);

				const response = await axios.post(data, {
					email: user.email,
				});

				const result = response.data;
				
				if (result.success) {
					
					// navigation.navigate('Home');
					const token = result.token;
					const agent = result.agent;
					navigation.navigate("AdmitPermission", {
						token: token,
						agent: agent,
					});
					
				} else {
					Alert.alert(
						"Error", // Title of the dialog
						result.msg  , // Message of the dialog
						[
							{ text: "OK" }, // Button to dismiss the dialog
						],
						{ cancelable: false } // Prevents the alert from being dismissed by tapping outside of the alert box
					);
				}
			}
			else if(data.startsWith(`${Config.API_URL}/near-payment`)) {
				await axios.post(data)
					.then(response => {
						const result = response.data;
						if(result.success) {
							navigation.navigate('Home')
						}
					})
					.catch(err => {
						console.log(err)
					})
			} 
			else {
				let decrypted_link = decryptAES(data, "nkeyskuo");
				navigation.navigate("VerifyOrigin", {
					state: decrypted_link,
				});
			}
		} catch (error) {
			Alert.alert(
				"Error", // Title of the dialog
				"QR error: " + error, // Message of the dialog
				[
					{ text: "OK" }, // Button to dismiss the dialog
				],
				{ cancelable: false } // Prevents the alert from being dismissed by tapping outside of the alert box
			);
		}
	};

	if (hasPermission === null) {
		return <Text>Requesting permission to access the camera...</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to the camera.</Text>;
	}

	return (
		<View style={styles.container}>
			<BarCodeScanner
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				style={styles.camDisplay}
			/>
			{!scanned ? (
				<Animated.View
					style={[
						styles.aimingSquare,
						{
							transform: [{ scale: pulseAnimation }],
						},
					]}
				>
					{/* Top-left corner */}
					<View style={[styles.squareCorner, styles.topLeftArrow]} />

					{/* Top-right corner */}
					<View
						style={[
							styles.squareCorner,
							{ top: 0, right: 0 },
							styles.topRightArrow,
						]}
					/>

					{/* Bottom-left corner */}
					<View
						style={[
							styles.squareCorner,
							{ bottom: 0, left: 0 },
							styles.bottomLeftArrow,
						]}
					/>

					{/* Bottom-right corner */}
					<View
						style={[
							styles.squareCorner,
							{ bottom: 0, right: 0 },
							styles.bottomRightArrow,
						]}
					/>
				</Animated.View>
			) : (
				<View style={styles.scanAgain}>
					<Button
						onPress={() => setScanned(false)}
						title="Scan again"
					/>
				</View>
			)}
		</View>
	);
}

const squareSize = 180;
const cornerSize = 15;

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
	},
	scanAgain: {
		position: "absolute",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	aimingSquare: {
		width: squareSize,
		height: squareSize,
		position: "absolute",
		top: (Dimensions.get("window").height - squareSize) / 2,
		left: (Dimensions.get("window").width - squareSize) / 2,
	},
	squareCorner: {
		width: cornerSize,
		height: cornerSize,
		borderColor: "lightyellow",
		position: "absolute",
	},
	camDisplay: {
		width: Dimensions.get("window").width * 1.65,
		height: Dimensions.get("window").height * 1.1,
	},
	topLeftArrow: {
		borderTopWidth: 7,
		borderLeftWidth: 7,
		borderTopLeftRadius: 10,
		top: -cornerSize / 2,
		left: -cornerSize / 2,
		padding: 10,
	},
	topRightArrow: {
		borderTopWidth: 7,
		borderRightWidth: 7,
		borderTopRightRadius: 10,
		top: -cornerSize / 2,
		right: -cornerSize / 2,
		padding: 10,
	},
	bottomLeftArrow: {
		borderBottomWidth: 7,
		borderLeftWidth: 7,
		borderBottomLeftRadius: 10,
		bottom: -cornerSize / 2,
		left: -cornerSize / 2,
		padding: 10,
	},
	bottomRightArrow: {
		borderBottomWidth: 7,
		borderRightWidth: 7,
		borderBottomRightRadius: 10,
		bottom: -cornerSize / 2,
		right: -cornerSize / 2,
		padding: 10,
	},
});
