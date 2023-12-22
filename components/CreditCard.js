import React, { useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Image,
	Dimensions,
	ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import StyleText from "../components/StyleText";


export default function CreditCard({ account, accountBalance, nearRate}) {
    return (
        <View style={styles.center}>
				<View style={styles.mainNav}>
					<TouchableOpacity style={styles.tab}>
						<Icon name="enter-outline" size={32} color="#9aa0a6" />
						<StyleText style={styles.text}>Deposit</StyleText>
					</TouchableOpacity>
					<TouchableOpacity style={styles.tab}>
						<Icon
							name="log-out-outline"
							size={32}
							color="#9aa0a6"
						/>
						<StyleText style={styles.text}>Withdraw</StyleText>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.tab}
					>
						<Icon name="card-outline" size={32} color="#9aa0a6" />
						<StyleText style={styles.text}>Payment</StyleText>
					</TouchableOpacity>
					<TouchableOpacity style={styles.tab}>
						<Icon
							name="game-controller-outline"
							size={32}
							color="#9aa0a6"
						/>
						<StyleText style={styles.text}>Games</StyleText>
					</TouchableOpacity>
				</View>

				<View style={[styles.balanceContainer, { marginTop: 10 }]}>
					<StyleText style={{ color: "#ccc", fontSize: 17 }}>
						{account.name}
					</StyleText>
					<StyleText style={styles.balance}>{accountBalance} Near</StyleText>
					<StyleText style={{ color: "#ccc", fontSize: 15 }}>
						~ {(accountBalance * nearRate).toFixed(2)} USDT
					</StyleText>
				</View>
			</View>
    )
}


const styles = StyleSheet.create({
	container: {
		height: Dimensions.get("window").height * 1.045,
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: "#F0F3F3",
	},
	tab: {
		alignItems: "center",
	},
	text: {
		color: "#ccc",
		fontSize: 10,
	},
	headerContainer: {
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
		borderBottomColor: "#ccc",
		width: "100%",
		maxHeight: 275,
	},
	
	mainNav: {
		position: "absolute",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		backgroundColor: "rgba(49, 53, 82, 0.8)",
		top: -70,
		// borderWidth: 1,
		// borderTopColor: 'lavender',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		paddingVertical: 15,
		width: "95%",
	},
	center: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	balanceContainer: {
		position: "absolute",
		top: -11,
		flexDirection: "column", // Set flexDirection to column
		alignItems: "center",
		width: "95%",
		backgroundColor: "#313552",
		// borderWidth: 1,
		borderColor: "transparent",
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
		paddingVertical: 20,
	},
	balance: {
		fontSize: 38,
		color: "#71C199",
		paddingVertical: 10,
	},
});