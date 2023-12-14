import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import Config from "../config.dev";

const apiUrl = Config.API_URL;

const PayConfirmScreen = ({ navigation }) => {
	const banner = require("../static/near-wallet.png");
	const route = useRoute();
	const [fetchUrl, setFetchUrl] = useState("");
	const [code, setCode] = useState("");
	const [totalPrice, setTotalPrice] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const { params } = route;
		if (params && params.fetch_url) {
			setFetchUrl(params.fetch_url);

			const queryString = params.fetch_url.split("?")[1];
			const query = queryString
				.split("&")
				.reduce((accumulator, current) => {
					const [key, value] = current.split("=");
					accumulator[key] = value;
					return accumulator;
				}, {});

			setCode(query["code"]);
			setTotalPrice(query["amount"]);
		}
	}, []);

	const handleAcceptClick = async () => {
		setIsLoading(true);
		fetchDataNearPayment();
	};

	const handleRejectClick = async () => {
		navigation.navigate("QRScanner");
	};

	const fetchDataNearPayment = async () => {
		await axios
			.put(fetchUrl)
			.then((response) => {
				const result = response.data;
				if (result.success) {
					navigation.navigate("Home");
				}
				console.log(result);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<Image
				style={{ width: "100%", height: 224.5 }}
				source={banner}
				resizeMode="contain"
			/>
			<View style={{ padding: 20, backgroundColor: "white" }}></View>
			<View style={styles.container}>
				<View style={styles.content}>
					<View style={styles.header_container}>
						<Text
							style={[
								styles.header,
								{ fontSize: 20, marginBottom: 20 },
							]}
						>
							PAYMENT DETAILS
						</Text>
					</View>
					<View style={styles.header_container}>
						<Text style={styles.header}>{totalPrice}</Text>
						<Text style={[styles.currency]}> NEAR</Text>
					</View>

					<View style={styles.listContainer}>
						<View style={styles.tableRow}>
							<Text style={styles.tableCell}>Order ID</Text>
							<Text
								style={[
									styles.tableCell,
									{ textAlign: "right" },
								]}
							>
								{code}
							</Text>
						</View>
						<View style={styles.tableRow}>
							<Text style={styles.tableCell}>Payment Method</Text>
							<Text
								style={[
									styles.tableCell,
									{ textAlign: "right" },
								]}
							>
								Near Wallet
							</Text>
						</View>
						<View style={styles.tableRow}>
							<Text style={styles.tableCell}>Currency</Text>
							<Text
								style={[
									styles.tableCell,
									{ textAlign: "right" },
								]}
							>
								{totalPrice} Near
							</Text>
						</View>
					</View>
					<View
						style={{
							flex: 1,
							flexDirection: 'column',
							justifyContent: "center",
							alignItems: "center",
							marginTop: 60
						}}
					>
						{isLoading && <ActivityIndicator size="large" color={"#000"} />}
					</View>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.admitBtn}
						onPress={handleAcceptClick}
					>
						<Text style={styles.buttonText}>Confirm</Text>
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
		backgroundColor: "white",
	},
	content: {
		// Content will float to top due to justifyContent in container
		width: "100%",
	},

	header_container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	currency: {
		color: "dimgrey",
		fontSize: 19,
		paddingTop: 5,
		paddingLeft: 5,
	},
	header: {
		fontSize: 25,
	},
	listContainer: {
		alignSelf: "stretch",
		marginBottom: 20,
		marginTop: 30,
	},
	tableRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 10,
		paddingVertical: 15,
		backgroundColor: "#f3f3f3",
		borderBottomColor: "#ccc",
		borderBottomWidth: 0.5,
	},
	tableCell: {
		flex: 1,
		color: "#000",
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

export default PayConfirmScreen;
