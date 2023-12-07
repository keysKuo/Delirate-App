import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableHighlight,
	TouchableOpacity,
	Alert,
	ScrollView,
} from "react-native";

import alter from "../static/alter.png";
import axios from "axios";
import Config from "../config.dev";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiUrl = Config.API_URL;

const HistoryScreen = ({ navigation }) => {
	const [currentPage, setCurrentPage] = useState("page1");
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const fetchDataOrders = async () => {
			const userJSON = await AsyncStorage.getItem("user");
			const user = JSON.parse(userJSON);

			await axios
				.get(
					`${apiUrl}/order/get_orders_by_customer/${user.customer_id}`
				)
				.then((response) => {
					const result = response.data;
					if (result.success) {
						setOrders([...result.data]);
					}
				})
				.catch((err) => {
					Alert.alert(
						"Error", // Title of the dialog
						"Orders not found", // Message of the dialog
						[
							{ text: "OK" }, // Button to dismiss the dialog
						],
						{ cancelable: false } // Prevents the alert from being dismissed by tapping outside of the alert box
					);
				});
		};

		if (orders.length == 0) {
			fetchDataOrders();
		}
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.navContainer}>
				{/* Menu */}
				<View style={styles.menu}>
					<TouchableHighlight
						style={[
							styles.menuItem,
							{
								borderColor: `${
									currentPage === "page1"
										? "#89B9AD"
										: "transparent"
								}`,
							},
						]}
						underlayColor="#DDD"
						onPress={() => setCurrentPage("page1")}
					>
						<Text
							style={{
								textAlign: "center",
								fontWeight: "bold",
								color: `${
									currentPage === "page1"
										? "#89B9AD"
										: "black"
								}`,
							}}
						>
							Arriving
						</Text>
					</TouchableHighlight>
					<TouchableHighlight
						style={[
							styles.menuItem,
							{
								borderColor: `${
									currentPage === "page2"
										? "#89B9AD"
										: "transparent"
								}`,
							},
						]}
						underlayColor="#DDD"
						onPress={() => setCurrentPage("page2")}
					>
						<Text
							style={{
								textAlign: "center",
								fontWeight: "bold",
								color: `${
									currentPage === "page2"
										? "#89B9AD"
										: "black"
								}`,
							}}
						>
							Finished
						</Text>
					</TouchableHighlight>
					<TouchableHighlight
						style={[
							styles.menuItem,
							{
								borderColor: `${
									currentPage === "page3"
										? "#89B9AD"
										: "transparent"
								}`,
							},
						]}
						underlayColor="#DDD"
						onPress={() => setCurrentPage("page3")}
					>
						<Text
							style={{
								textAlign: "center",
								fontWeight: "bold",
								color: `${
									currentPage === "page3"
										? "#89B9AD"
										: "black"
								}`,
							}}
						>
							Canceled
						</Text>
					</TouchableHighlight>
				</View>

				{/* Content */}
			</View>
			<ScrollView style={styles.content}>
				{currentPage === "page1" && (
					<>
						{orders.map((order, index) => {
							return (
								<TouchableOpacity
									key={index}
									onPress={() => {
										navigation.navigate("Order Detail",{
											data: order
										});
									}}
									style={styles.orderContainer}
								>
									<View
										style={[
											styles.rowBox,
											{
												borderTopWidth: 0.5,
												borderColor: "#ccc",
											},
										]}
									>
										<Text
											style={{
												fontSize: 16,
												fontWeight: "bold",
											}}
										>
											{order.store.name} - Store
										</Text>
										<Text
											style={{
												paddingTop: 2,
												fontSize: 13,
												color: "#ccc",
											}}
										>
											{order.createdDate}
										</Text>
									</View>

									{order.items.map((item, idx) => {
										return (
											<View
											key={idx}
												style={[
													styles.deliveryInfo,
													{ marginTop: 5, borderBottomWidth: 0.5, borderBottomColor: '#ccc' },
												]}
											>
												<View
													style={[
														styles.infoHeader,
														{ paddingRight: "20%" },
													]}
												>
													<Image
														style={{
															width: 100,
															height: 100,
														}}
														source={{
															uri: `${apiUrl}/uploads${item.info.image}`,
														}}
													/>
													<View
														style={{
															paddingHorizontal: 15,
															paddingVertical: 5,
														}}
													>
														<Text
															style={{
																flexWrap:
																	"wrap",
																textAlign:
																	"left",
																fontWeight:
																	"bold",
															}}
														>
															{item.info.model}
														</Text>
														<View
															style={
																styles.infoHeader
															}
														>
															<Text
																style={{
																	flexWrap:
																		"wrap",
																	textAlign:
																		"left",
																	paddingTop: 5,
																}}
															>
																{item.info.sku}
															</Text>
														</View>
														<View
															style={
																styles.infoHeader
															}
														>
															<Text
																style={{
																	color: "lightcoral",
																	paddingTop: 5,
																}}
															>
																${item.info.price}{" "}
															</Text>
															<Text
																style={{
																	paddingTop: 5,
																}}
															>
																{" "}
																(x{item.qty}) - {order.payment_type}
															</Text>
														</View>
													</View>
												</View>
											</View>
										);
									})}
									<View
										style={[
											styles.rowBox,
											{
												paddingHorizontal: 25,
												paddingTop: 0,
												borderBottomWidth: 0.5,
												borderColor: "#ccc",
											},
										]}
									>
										<Text
											style={{
												color: "#89B9AD",
												fontWeight: "bold",
												fontSize: 16,
												marginLeft: 15,
												position: "absolute",
												right: 15,
												bottom: 12,
											}}
										>
											Arriving
										</Text>
									</View>
								</TouchableOpacity>
							);
						})}
					</>
				)}
				{currentPage === "page2" && <Text>Page 2 Content</Text>}
				{currentPage === "page3" && <Text>Page 3 Content</Text>}
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
		flex: 2,
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
