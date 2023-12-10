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


import axios from "axios";
import Config from "../config.dev";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StyleText from "../components/StyleText";
import FullScreenLoader from "../components/FullScreenLoader";
import BottomNav from "../components/BottomNav";


const apiUrl = Config.API_URL;

const HistoryScreen = ({ navigation }) => {
	const [currentPage, setCurrentPage] = useState("page1");
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(true); // Tracks overall loading state

	// Fetch orders data
	const fetchDataOrders = async () => {
		const userJSON = await AsyncStorage.getItem("user");
		const user = JSON.parse(userJSON);

		try {
			const response = await axios.get(
				`${apiUrl}/order/get_orders_by_customer/${user.customer_id}`
			);
			const result = response.data;
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
							onPress={() => {
								setCurrentPage("page1");
								setIsLoading(true);
							}}
						>
							<StyleText
								style={{
									textAlign: "center",

									color: `${
										currentPage === "page1"
											? "#89B9AD"
											: "black"
									}`,
								}}
							>
								Arriving
							</StyleText>
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
							<StyleText
								style={{
									textAlign: "center",

									color: `${
										currentPage === "page2"
											? "#89B9AD"
											: "black"
									}`,
								}}
							>
								Finished
							</StyleText>
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
							<StyleText
								style={{
									textAlign: "center",

									color: `${
										currentPage === "page3"
											? "#89B9AD"
											: "black"
									}`,
								}}
							>
								Canceled
							</StyleText>
						</TouchableHighlight>
					</View>

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
						onPress={() => {
							setCurrentPage("page1");
							setIsLoading(true);
						}}
					>
						<StyleText
							style={{
								textAlign: "center",

								color: `${
									currentPage === "page1"
										? "#89B9AD"
										: "black"
								}`,
							}}
						>
							Arriving
						</StyleText>
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
						<StyleText
							style={{
								textAlign: "center",

								color: `${
									currentPage === "page2"
										? "#89B9AD"
										: "black"
								}`,
							}}
						>
							Finished
						</StyleText>
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
						<StyleText
							style={{
								textAlign: "center",

								color: `${
									currentPage === "page3"
										? "#89B9AD"
										: "black"
								}`,
							}}
						>
							Canceled
						</StyleText>
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
										navigation.navigate("Order Detail", {
											data: order,
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
										<StyleText
											style={{
												fontSize: 16,
											}}
										>
											{order.store.name} - Store
										</StyleText>
										<StyleText
											style={{
												paddingTop: 2,
												fontSize: 13,
												color: "#ccc",
											}}
										>
											{order.createdDate}
										</StyleText>
									</View>

									{order.items.map((item, idx) => {
										return (
											<View
												key={idx}
												style={[
													styles.deliveryInfo,
													{
														marginTop: 5,
														borderBottomWidth: 0.5,
														borderBottomColor:
															"#ccc",
													},
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
														<StyleText
															style={{
																flexWrap:
																	"wrap",
																textAlign:
																	"left",
															}}
														>
															{item.info.model}
														</StyleText>
														<View
															style={
																styles.infoHeader
															}
														>
															<StyleText
																style={{
																	flexWrap:
																		"wrap",
																	textAlign:
																		"left",
																	paddingTop: 5,
																	color: "#ccc",
																}}
															>
																{item.info.sku}
															</StyleText>
														</View>
														<View
															style={
																styles.infoHeader
															}
														>
															<StyleText
																style={{
																	color: "lightcoral",
																	paddingTop: 5,
																}}
															>
																$
																{
																	item.info
																		.price
																}{" "}
															</StyleText>
															<StyleText
																style={{
																	paddingTop: 5,
																}}
															>
																{" "}
																(x{item.qty}) -{" "}
																{
																	order.payment_type
																}
															</StyleText>
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
										<StyleText
											style={{
												color: "#89B9AD",

												fontSize: 16,
												marginLeft: 15,
												position: "absolute",
												right: 15,
												bottom: 12,
											}}
										>
											{order.status}
										</StyleText>
									</View>
								</TouchableOpacity>
							);
						})}
					</>
				)}
				{currentPage === "page2" && (
					<StyleText>Page 2 Content</StyleText>
				)}
				{currentPage === "page3" && (
					<StyleText>Page 3 Content</StyleText>
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
