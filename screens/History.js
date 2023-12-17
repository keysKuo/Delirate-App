import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,

	Alert,
	ScrollView,
} from "react-native";


import axios from "axios";
import Config from "../config.dev";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StyleText from "../components/StyleText";
import FullScreenLoader from "../components/FullScreenLoader";
import Menu from "../components/Menu";
import OrderList from "../components/OrderList";

const menuItems = ['Arriving', 'Finished', 'Canceled']

const apiUrl = Config.API_URL;

const HistoryScreen = ({ navigation }) => {
	const [currentPage, setCurrentPage] = useState("Arriving");
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(true); // Tracks overall loading state

	// Fetch orders data
	const fetchDataOrders = async () => {
		const userJSON = await AsyncStorage.getItem("user");
		const user = JSON.parse(userJSON);
		console.log(`${apiUrl}/order/get_orders_by_customer/${user.customer_id}`)
		try {
			const response = await axios.get(
				`${apiUrl}/order/get_orders_by_customer/${user.customer_id}`
			);
			const result = response.data;
			console.log(result)
			if (result.success) {
				setOrders([...result.data]);
				checkLoading(); // Check if loading should be completed
			}
		} catch (err) {
			Alert.alert("Error", "Orders not found", [{ text: "OK" }], {
				cancelable: false,
			});
		}
	};

	// Check if both fonts and data are loaded
	const checkLoading = () => {
		if (orders.length > 0) {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (orders.length === 0) {
			fetchDataOrders();
		}
	}, []);

	useEffect(() => {
		checkLoading();
	}, [orders, isLoading]);

	if (isLoading) {
		return (
			<View style={styles.container}>
				<View style={styles.navContainer}>
					{/* Menu */}
					<Menu
						menuItems={menuItems}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						setIsLoading={setIsLoading}
						qty={3}
					/>

					{/* Content */}
				</View>
				<ScrollView style={styles.content}>
					<FullScreenLoader axis={0.9}/>
				</ScrollView>

			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.navContainer}>
				{/* Menu */}
				<Menu
						menuItems={menuItems}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						setIsLoading={setIsLoading}
						qty={3}
					/>

				{/* Content */}
			</View>
			<ScrollView style={styles.content}>
				{currentPage === "Arriving" && (		
					<OrderList navigation={navigation} orders={orders.filter(order => {
						return order.status !== 'Finished' && order.status !== 'Canceled';
					})} />
				)}
				{currentPage === "Finished" && (
					<OrderList navigation={navigation} orders={orders.filter(order => {
						return order.status === 'Finished';
					})} />
				)}
				{currentPage === "Canceled" && (
					<OrderList navigation={navigation} orders={orders.filter(order => {
						return order.status === 'Canceled';
					})} />
				)}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
	},
	navContainer: {
		flexDirection: "row",
		backgroundColor: "white",
	},
	orderContainer: {
		marginBottom: 10,
		backgroundColor: "white",
	},
	menu: {
		flex: 1,

		flexDirection: "row",
		justifyContent: "space-between",
	},
	menuItem: {
		width: "33.33%",
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center",
		height: 50,

		borderBottomWidth: 3,
	},
	content: {
		flex: 1,
	},
	rowBox: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingTop: 20,
		backgroundColor: "white",
	},
	deliveryInfo: {
		paddingVertical: 15,
		paddingHorizontal: 20,
		paddingBottom: 15,
	},
	infoHeader: {
		flexDirection: "row",
	},
	price: {
		position: "absolute",
		bottom: 5,
		right: -5,
	},
});

export default HistoryScreen;
