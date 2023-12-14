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
import { ListItem, Avatar } from "@rneui/themed";
import axios from "axios";
import FullScreenLoader from "../components/FullScreenLoader";
import Config from "../config.dev";
import Menu from "../components/Menu";
import BottomNav from "../components/BottomNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CreditCard from "../components/CreditCard";

const menuItems = ["Tokens", "Transactions"];

const apiUrl = Config.API_URL;

const HomeScreen = ({ navigation }) => {
	const [account, setAccount] = useState({
		name: "",
		email: "",
		phone: "",
		role: "",
	});
	const logo = require("../static/delirate2.png");
	const coinAPI = "https://api.coincap.io/v2/assets";
	const [currentPage, setCurrentPage] = useState("Tokens");
	const [coinTokens, setCoinTokens] = useState([]);
	const [nearRate, setNearRate] = useState(0);
	const [accountBalance, setAccountBalance] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [refreshKey, setRefreshkey] = useState(0);

	useEffect(() => {
		const fetchCryptoPrices = async () => {
			await axios
				.get(coinAPI)
				.then((response) => {
					const result = response.data;
					const targets = result.data.map((item) => {
						if (item.id === "near-protocol") {
							setNearRate(item.priceUsd);
						}
						let changePercent = parseFloat(item.changePercent24Hr);
						let change24HrStr =
							changePercent > 0
								? "+" + changePercent.toFixed(4)
								: +changePercent.toFixed(4);
						return { ...item, change24HrStr: change24HrStr };
					});
					setCoinTokens([...targets]);
					checkLoading();
				})
				.catch((err) => {
					console.log(err);
				});
		};

		const fetchAccountBalance = async () => {
			
			await axios
				.get(`${apiUrl}/account/get_account_balance`)
				.then((response) => {
					const result = response.data;

					if (result.success) {
						setAccountBalance(
							(
								parseFloat(result.balance) / Math.pow(10, 24)
							).toFixed(2)
						);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		};

		// Call the function
		fetchCryptoPrices();
		fetchAccountBalance();
	}, [refreshKey]);
	
	const checkAccount = async () => {
		const userJSON = await AsyncStorage.getItem("user");
		setAccount({ ...JSON.parse(userJSON) });
	}

	useEffect(() => {
		checkAccount()
	},[]);

	const checkLoading = () => {
		if (coinTokens.length > 0) {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		checkLoading();
	}, [coinTokens, isLoading]);

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Image style={styles.logo} source={logo} resizeMode="contain" />
			</View>

			<CreditCard
					account={account}
					accountBalance={accountBalance}
					nearRate={nearRate}
				/>

			<View style={{ paddingVertical: 80 }}></View>

			{isLoading ? (
				<>
					<Menu
						menuItems={menuItems}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						setIsLoading={setIsLoading}
						qty={2}
						style={{ paddingHorizontal: 15 }}
					/>
					<ScrollView style={styles.slider}>
						<FullScreenLoader axis={0.5} />
					</ScrollView>
				</>
			) : (
				<>
					<Menu
						menuItems={menuItems}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						setIsLoading={setIsLoading}
						qty={2}
						style={{ paddingHorizontal: 15 }}
					/>
					<ScrollView style={styles.slider}>
						{currentPage == "Tokens" ? (
							coinTokens.map((token, index) => {
								const symbol = `${token.id}.png`;
								return (
									<ListItem key={index} bottomDivider>
										<Avatar
											rounded
											style={{ marginLeft: 10 }}
											source={{
												uri: `${apiUrl}/symbols/${symbol}`,
											}}
											avatarStyle={{
												width: 32,
												height: 32,
											}} // Adjust width and height as needed
										/>
										<ListItem.Content>
											<View
												style={{
													flexDirection: "row",
													justifyContent:
														"space-between",
													width: 290,
												}}
											>
												<View
													style={{
														flexDirection: "column",
													}}
												>
													<StyleText
														style={{ fontSize: 16 }}
													>
														{token.name}
													</StyleText>
													<StyleText
														style={{
															fontSize: 13,
															color: "grey",
														}}
													>
														{token.symbol}
													</StyleText>
												</View>
												<View
													style={{
														flexDirection: "column",
													}}
												>
													<StyleText
														style={{
															fontSize: 16,
															textAlign: "right",
														}}
													>
														$
														{parseFloat(
															token.priceUsd
														).toFixed(2)}{" "}
													</StyleText>
													<StyleText
														style={{
															fontSize: 13,
															textAlign: "right",
															marginRight: 4,
														}}
													>
														<StyleText
															style={{
																color:
																	token.changePercent24Hr >
																	0
																		? "#71B280"
																		: "lightcoral",
															}}
														>
															{
																token.change24HrStr
															}
														</StyleText>
													</StyleText>
												</View>
											</View>
										</ListItem.Content>
									</ListItem>
								);
							})
						) : (
							<FullScreenLoader axis={0.5} />
						)}
					</ScrollView>
				</>
			)}

			<BottomNav
				navigation={navigation}
				setRefreshKey={setRefreshkey}
				setIsLoading={setIsLoading}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: Dimensions.get("window").height * 1.045,
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: "#F0F3F3",
	},
	banner: {
		width: "100%",
		// position: "absolute",
		// top: 50,
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
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
		borderBottomColor: "#ccc",
		width: "100%",
		maxHeight: 275,
	},
	logo: {
		width: "100%",
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
	slider: {
		flexDirection: "column", // Set flexDirection to column
		// alignItems: "center",
		// justifyContent: "center",
		width: "100%",
		maxHeight: 440,
	},
});

export default HomeScreen;
