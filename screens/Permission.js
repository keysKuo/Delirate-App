import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Alert,
} from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import Config from "../config.dev";

const apiUrl = Config.API_URL;

const AdmitPermissionScreen = ({ navigation }) => {
	const banner = require("../static/delirate2.png");
	const route = useRoute();
	const [sessionToken, setSessionToken] = useState("");
	const [agent, setAgent] = useState({
		browser: "",
		os: "",
		timestamp: "",
		location: "",
	});

	useEffect(() => {
		const { params } = route;
		if (params && params.token && params.agent) {
			setAgent({ ...params.agent });
			setSessionToken(params.token);
		}
	}, []);

	const handleAcceptClick = async () => {
        fetchDataAdmitPermission('true')
    };

	const handleRejectClick = async () => {
        fetchDataAdmitPermission('false')
    };

	const fetchDataAdmitPermission = async (verify) => {
		try {
			const response = await axios.get(
				apiUrl +
					`/account/admit_permission?verify=${verify}&token=${sessionToken}`
			);

			navigation.navigate("Home");
		} catch (error) {
			Alert.alert(
				"Error", // Title of the dialog
				"Login Error: " + error, // Message of the dialog
				[
					{ text: "OK" }, // Button to dismiss the dialog
				],
				{ cancelable: false } // Prevents the alert from being dismissed by tapping outside of the alert box
			);
		}
	};

	return (
		<>
			<Image
				style={{ width: "100%", height: 178 }}
				source={banner}
				resizeMode="contain"
			/>
			<View style={{ padding: 20 }}></View>
			<View style={styles.container}>
				<View style={styles.content}>
					<Text style={styles.header}>
						Login Delirate Web with QR
					</Text>
					<View style={styles.listContainer}>
						<View style={styles.tableRow}>
							<Text style={styles.tableCell}>Device:</Text>
							<Text style={styles.tableCell}>
								{agent.browser} - {agent.os}
							</Text>
						</View>
						<View style={styles.tableRow}>
							<Text style={styles.tableCell}>Time:</Text>
							<Text style={styles.tableCell}>
								{agent.timestamp}
							</Text>
						</View>
						<View style={styles.tableRow}>
							<Text style={styles.tableCell}>Location:</Text>
							<Text style={styles.tableCell}>
								{agent.location}
							</Text>
						</View>
					</View>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.admitBtn}
						onPress={handleAcceptClick}
					>
						<Text style={styles.buttonText}>Accept</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.admitBtn,
							{ backgroundColor: "rgba(0,0,0,0.05)" },
						]}
						onPress={handleRejectClick}
					>
						<Text style={[styles.buttonText, { color: "#000" }]}>
							Reject
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		justifyContent: "space-between",
		alignItems: "center",
		textAlign: "center", // Adjusts to space content and buttons\
	},
	content: {
		// Content will float to top due to justifyContent in container
		width: "100%",
	},
	header: {
		fontSize: 25,
		fontWeight: "bold",
		marginBottom: 20,
	},
	listContainer: {
		alignSelf: "stretch",
		marginBottom: 20,
	},
	tableRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	tableCell: {
		flex: 1,
	},
	buttonContainer: {
		flexDirection: "column",
		justifyContent: "space-between",
		width: "90%", // Makes buttons spread across the bottom
		paddingBottom: 20,
	},
	admitBtn: {
		backgroundColor: "#313552",
		width: "100%",
		height: 50,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default AdmitPermissionScreen;
