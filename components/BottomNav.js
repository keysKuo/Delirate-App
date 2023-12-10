import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import StyleText from "./StyleText";
import Icon from "react-native-vector-icons/Ionicons";

export default function BottomNav({ navigation, setRefreshKey, setIsLoading }) {
	return (
		<View style={styles.navigatorContainer}>
			<TouchableOpacity
				onPress={() => {
                    setIsLoading(true);
					setRefreshKey((prev) => prev + 1);
				}}
				style={styles.tab}
			>
				<Icon name="home-outline" size={30} color="#9aa0a6" />
				<StyleText style={styles.text}>Home</StyleText>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.tab}
				onPress={() => {
					navigation.navigate("History");
				}}
			>
				<Icon name="logo-buffer" size={30} color="#9aa0a6" />
				<StyleText style={styles.text}>History</StyleText>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate("QRScanner");
				}}
				style={styles.tab}
			>
				<Icon name="scan-outline" size={42} color="#9aa0a6" />
				{/* <StyleText style={styles.text}>QR Scan</StyleText> */}
			</TouchableOpacity>
			<TouchableOpacity style={styles.tab}>
				<Icon name="wallet-outline" size={30} color="#9aa0a6" />
				<StyleText style={styles.text}>Wallet</StyleText>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate("WalletProfile");
				}}
				style={styles.tab}
			>
				<Icon name="person-circle-outline" size={30} color="#9aa0a6" />
				<StyleText style={styles.text}>Profile</StyleText>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	navigatorContainer: {
		position: "absolute",
		bottom: 0,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		backgroundColor: "#313552",
		borderTopWidth: 0.2,
		borderTopColor: "#ccc",
		paddingVertical: 7,
		width: "100%",
	},
	tab: {
		alignItems: "center",
	},
	text: {
		color: "#ccc",
		fontSize: 10,
	},
});
