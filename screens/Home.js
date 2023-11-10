import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const HomeScreen = ({ navigation }) => {
	const logo = require("../static/delirate2.png");
  const banner = require("../static/banner.png");

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Image style={styles.logo} source={logo} resizeMode="contain" />
			</View>

			<View style={styles.center}>
				<View style={styles.mainNav}>
					<TouchableOpacity style={styles.tab}>
						<Icon name="enter-outline" size={32} color="#9aa0a6" />
						<Text style={styles.text}>Deposit</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.tab}>
						<Icon
							name="log-out-outline"
							size={32}
							color="#9aa0a6"
						/>
						<Text style={styles.text}>Withdraw</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("QRScanner");
						}}
						style={styles.tab}
					>
						<Icon name="card-outline" size={32} color="#9aa0a6" />
						<Text style={styles.text}>Payment</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.tab}>
						<Icon
							name="game-controller-outline"
							size={32}
							color="#9aa0a6"
						/>
						<Text style={styles.text}>Games</Text>
					</TouchableOpacity>
				</View>

        <View style={[styles.balanceContainer, { marginTop: 10 }]}>
				<Text style={{ color: "#ccc", fontSize: 20 }}>
					Wallet balance
				</Text>
				<Text style={styles.balance}>$5.00</Text>
				<Text style={{ color: "#ccc", fontSize: 20 }}>
					~ 6.1532 Near
				</Text>
			</View>
			</View>

			
			<View style={styles.center}>
				<Image
					style={styles.banner}
					source={banner}
					resizeMode="contain"
				/>
			</View>

			<View style={styles.navigatorContainer}>
				<TouchableOpacity style={styles.tab}>
					<Icon name="home-outline" size={32} color="#9aa0a6" />
					<Text style={styles.text}>Home</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.tab}>
					<Icon name="cart-outline" size={32} color="#9aa0a6" />
					<Text style={styles.text}>History</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("QRScanner");
					}}
					style={styles.tab}
				>
					<Icon name="scan-outline" size={32} color="#9aa0a6" />
					<Text style={styles.text}>QR Scan</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.tab}>
					<Icon name="wallet-outline" size={32} color="#9aa0a6" />
					<Text style={styles.text}>Wallet</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.tab}>
					<Icon
						name="person-circle-outline"
						size={32}
						color="#9aa0a6"
					/>
					<Text style={styles.text}>Profile</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    height: Dimensions.get('window').height,
    backgroundColor: '#F0F3F3'
  },
  banner: {
    width: '60%',
    position: 'absolute',
    top: 180
  },
	navigatorContainer: {
		position: "absolute",
		bottom: 0,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		backgroundColor: "#313552",
		borderTopWidth: 0.2,
		borderTopColor: "#ccc",
		paddingVertical: 10,
		width: "100%",
	},
	tab: {
		alignItems: "center",
	},
	text: {
		color: "#ccc",
		fontSize: 10,
	},
	headerContainer: {
		position: "absolute",
		top: 0,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		backgroundColor: "#313552",
		borderBottomColor: "#ccc",
		paddingVertical: 10,
		width: "100%",
    maxHeight: 160
	},
  logo: {
    width: '100%'
  },
  mainNav: {
    position: "absolute",
		top: 130,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		backgroundColor: "#313552",
		borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 10,
		paddingVertical: 10,
		width: "80%",
  },
  center: {
    flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
  }, 
  balanceContainer: {
    position: "absolute",
		top: 250,
    flexDirection: "column", // Set flexDirection to column
    alignItems: "center",
    width: '90%',
    backgroundColor: "#313552",
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 15,
    paddingVertical: 10
  },
  balance: {
    fontSize: 35,
    color: 'lightgreen'
  }
  
});

export default HomeScreen;
