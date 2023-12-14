import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	Image,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import EntypoIcon from "react-native-vector-icons/Entypo";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropdownComponent from "../components/Dropdown";
import Modal from 'react-native-modal';
import { useRoute } from "@react-navigation/native";


import Config from "../config.dev";
const apiUrl = Config.API_URL;

export default function TrackingDeliveryScreen({ navigation }) {
	const apiKey = "103c6e71aa844086a6bbda0e3e9c7ffe";
	const [code, setCode] = useState('');
	const route = useRoute();


	const [_status, setStatus] = useState("");
	const [note, setNote] = useState("");
	const [location, setLocation] = useState({
		latitude: "",
		longitude: "",
		accuracy: "",
	});
	const [foundLocation, setFoundLocation] = useState("");
	const [errorMsg, setErrorMsg] = useState(null); // Updated to store the current location
	const [trackSigner, setTrackSigner] = useState("");
	const [capturedImage, setCapturedImage] = useState(null);
	const [isModalVisible, setModalVisible] = useState(false);

	const logo = require("../static/delirate-main.png");

	useEffect(() => {
		const { params } = route;
		if (params && params.code) {
			setCode(params.code);
		}
	}, []);

	const fetchLocation = async (url) => {
		axios
			.get(url)
			.then((response) => {
				const result = response.data;
				if (result.status.code == 200) {
					const data = result.results[0].components;

					setFoundLocation(
						data.quarter + ", " + data.suburb + " " + data.country
					);
					// console.log(result.results[0].components)
				}
			})
			.catch((error) => {
				// console.error("Error fetching location data:", error);
			});
	};

	useEffect(() => {
		(async () => {
			const userJSON = await AsyncStorage.getItem("user");
			const user = JSON.parse(userJSON);

			if (!trackSigner) {
				setTrackSigner(user.email);
			}
		})();

		// Function to fetch and set the current location
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation({ ...location.coords });
		})();
	}, []);

	let text = "Waiting...";
	if (errorMsg) {
		text = errorMsg;
	} else if (location && !foundLocation) {
		const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${location.latitude}+${location.longitude}&key=${apiKey}`;
		fetchLocation(apiUrl);
		text = JSON.stringify(foundLocation || text);
	}

	const takePhoto = async () => {
		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: "Images",
			aspect: [4, 3],
		});

		if (!result.canceled) {
			const file = result.assets[0].uri;
			// console.log(result.assets[0].uri);
			setCapturedImage(file);
		}
	};

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	  };

	const handleSubmit = () => {
		// Handle form submission here, including the status, note, location, trackSigner, and capturedImage.
		console.log("Status:", _status);
		console.log("Note:", note);
		console.log("Location:", foundLocation);
		console.log("Track Signer:", trackSigner);
		console.log("Captured Image:", capturedImage);

		toggleModal();
		// You can send the data to your server or perform any other desired action.
	};

	const handleConfirm = () => {
		// Perform your confirmation logic here
		// This can include updating state or executing an action
		// Once the confirmation is done, you can close the modal
		fetchTrackingDelivery();
		toggleModal();
		navigation.navigate("Home");
	  };

	const fetchTrackingDelivery = async () => {

		const formDataToSend = new FormData();
		formDataToSend.append('file', {
			name: new Date() + '.png',
			uri: capturedImage,
			type: 'image/jpg'
		});
		formDataToSend.append('track_signer', trackSigner);
		formDataToSend.append('location', foundLocation);
		formDataToSend.append('status', _status);
		formDataToSend.append('note', note);
		formDataToSend.append('folder', `/${trackSigner}/trackings`)
		
		await axios.put(`${apiUrl}/order/tracking_delivery/${code}`, formDataToSend, {
			headers: {
				'Folder-Path': `/${trackSigner}/trackings`,
				'Content-Type': 'multipart/form-data',
			},
		})
			.then(response => {
				const result = response.data;
				console.log(result);
			})
			.catch(err => {
				console.log(err);
			})
	}

	return (
		<View style={styles.container}>
			<Image source={logo} style={styles.logo} resizeMode="contain" />

			<TextInput
				editable={false}
				selectTextOnFocus={false}
				style={styles.input}
				value={trackSigner}
				onChangeText={setTrackSigner}
				placeholder="Enter track signer"
			/>

			<TextInput
				editable={false}
				selectTextOnFocus={false}
				style={styles.input}
				value={foundLocation}
				placeholder={text}
			/>

			{/* <TextInput
				style={styles.input}
				value={_status}
				onChangeText={setStatus}
				placeholder="Enter status"
			/> */}

			<DropdownComponent setStatus={setStatus} />

			<TextInput
				style={[styles.input, {  borderColor: "black" }]}
				value={note}
				onChangeText={setNote}
				placeholder="Enter note"
				placeholderTextColor="black"
			/>

			<TouchableOpacity style={styles.button} onPress={takePhoto}>
				<EntypoIcon name="camera" size={25} color="#000" />
			</TouchableOpacity>

			{capturedImage && (
				<Image source={{ uri: capturedImage }} style={styles.image} />
			)}
			
			<TouchableOpacity
				onPress={handleSubmit}
				style={styles.buttonSubmit}
			>
				<Text style={styles.buttonText}>Tracking</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => {
					navigation.navigate('Home')
				}}
				style={[styles.buttonSubmit, { backgroundColor: "rgba(0,0,0,0.05)"}]}
			>
				<Text style={[styles.buttonText, { color: 'black'}]}>Cancel</Text>
			</TouchableOpacity>

			<Modal isVisible={isModalVisible}>
				<View style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: "center",
						alignItems: "center",
						maxHeight: 100,
						backgroundColor: 'white'
					}}>
					<Text >Are you sure you want to perform this action?</Text>
				</View>
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: "space-around",
						alignItems: "center",
						maxHeight: 50,
						backgroundColor: 'white',
					}}
				>
					<TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
						<Text style={styles.modalText}>Cancel</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.modalButton} onPress={handleConfirm}>
						<Text style={styles.modalText}>Confirm</Text>
					</TouchableOpacity>
					
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f7f7f7",
	},
	modalText: {
		color: '#3876BF',
		fontWeight: 'bold',
		textTransform: 'uppercase'
	},
	modalButton: {
		alignItems: "center",
		justifyContent: 'center',
		borderWidth: 0.2,
		borderColor: '#ccc',
		
		height: 50,
		width: '50%'
	},
	logo: {
		width: "100%",
		height: 100,
		marginBottom: 20,
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
	button: {
		backgroundColor: "transparent",
		width: "20%",
		height: 40,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 10,
	},
	buttonSubmit: {
		backgroundColor: "#313552",
		width: "80%",
		height: 40,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
	image: {
		width: 200,
		height: 200,
		resizeMode: "cover",
		marginBottom: 12,
	},

	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
});
