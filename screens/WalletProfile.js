import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FontAwesome5 } from "@expo/vector-icons";
import StyleText from "../components/StyleText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomNav from "../components/BottomNav";

import Config from "../config.dev";

const apiUrl = Config.API_URL;

const WalletProfileScreen = ({ navigation }) => {
	// Replace the following with actual user account data
	const banner = require("../static/profile_banner.png");
	const [userAccount, setUserAccount] = useState({
		username: "john_doe",
		email: "john.doe@example.com",
		phoneNumber: "+1234567890",
		profileImage: require("../static/alter.png"), // Replace with the actual path
	});

	useEffect(() => {
		const fetchDataProfile = async () => {
			const userJSON = await AsyncStorage.getItem('user');
			const user = JSON.parse(userJSON);

			setUserAccount({
				username: user.name,
				email: user.email,
				phoneNumber: user.phone,
				profileImage: user.avatar
			})
		}	
		fetchDataProfile()
	}, [userAccount])

	return (
		<View style={styles.container}>
			<Image
				style={{ width: "100%", height: 207.5 }}
				source={banner}
				resizeMode="contain"
			/>
			<View style={styles.profileHeader}>
				<Image
					source={{uri: `${userAccount.profileImage}`}}
					style={styles.profileImage}
				/>
				<StyleText style={[styles.username]}>{userAccount.username}</StyleText>
				<StyleText style={styles.email}>{userAccount.email}</StyleText>
				<StyleText style={styles.phoneNumber}>
					{userAccount.phoneNumber}
				</StyleText>
			</View>

			<View style={{ paddingVertical: 10}}></View>

			<TouchableOpacity style={styles.editButton}>
				<View style={{ flexDirection: "row" }}>
					<MaterialIcons
						style={styles.editIcon}
						name="notifications"
						size={18}
						color="#000"
					/>
					<StyleText style={styles.editButtonText}>Notification</StyleText>
				</View>
				<View style={styles.countCircle}><StyleText style={{ color: '#fff', fontSize: 9, marginRight: 0.5}}>!</StyleText></View>
			</TouchableOpacity>

			<TouchableOpacity style={styles.editButton}>
				<View style={{ flexDirection: "row" }}>
					<MaterialIcons
						style={styles.editIcon}
						name="edit"
						size={18}
						color="#000"
					/>
					<StyleText style={styles.editButtonText}>Edit Profile</StyleText>
				</View>
				<FontAwesome5 name="angle-right" size={20} color="black" />
			</TouchableOpacity>

			<TouchableOpacity style={styles.editButton}>
				<View style={{ flexDirection: "row" }}>
					<MaterialIcons
						style={styles.editIcon}
						name="help"
						size={18}
						color="#000"
					/>
					<StyleText style={styles.editButtonText}>Help</StyleText>
				</View>
				<FontAwesome5 name="angle-right" size={20} color="black" />
			</TouchableOpacity>

			<TouchableOpacity style={styles.editButton}>
				<View style={{ flexDirection: "row" }}>
					<MaterialIcons
						style={styles.editIcon}
						name="settings"
						size={18}
						color="#000"
					/>
					<StyleText style={styles.editButtonText}>Settings</StyleText>
				</View>
				<FontAwesome5 name="angle-right" size={20} color="black" />
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => {
					// Implement logout logic
					// For example, navigate to the login screen or clear the authentication token
					navigation.navigate("Login");
				}}
				style={[styles.editButton, { borderColor: 'lightcoral'}]}
			>
				<View style={{ flexDirection: "row" }}>
					<MaterialIcons
						style={styles.editIcon}
						name="logout"
						size={18}
						color="lightcoral"
					/>
					<StyleText
						style={[styles.editButtonText, { color: "lightcoral" }]}
					>
						Log out
					</StyleText>
				</View>
			</TouchableOpacity>

			{/* <BottomNav navigation={navigation} /> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},

	profileHeader: {
		alignItems: "center",
		justifyContent: "center",
		height: 350,
		marginTop: -105,
	},
	profileImage: {
		width: 150,
		height: 150,
		borderRadius: 75,
		marginBottom: 20,
	},
	username: {
		fontSize: 24,
		marginBottom: 10,
	},
	email: {
		fontSize: 16,
		marginBottom: 10,
	},
	phoneNumber: {
		fontSize: 16,
		marginBottom: 20,
	},
	editButton: {
		paddingVertical: 10,
		paddingHorizontal: 10,
		marginHorizontal: 50,
		marginBottom: 13,
		flexDirection: "row",
		justifyContent: "space-between",
		borderWidth: 1.5,
		borderColor: '#31304D',
		borderRadius: 10
	},
	editButtonText: {
		fontSize: 16,
		lineHeight: 20,
		
		// fontWeight: "bold",
	},
	editIcon: {
		paddingRight: 10,
	},
	logoutButton: {
		padding: 10,
		borderRadius: 5,
	},
	logoutButtonText: {
		fontSize: 16,
	},
	countCircle: {
		width: 18,
		height: 18,
		borderRadius: 100,
		backgroundColor: 'crimson',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		marginTop: 2,
		marginRight: -3
	}
});

export default WalletProfileScreen;
