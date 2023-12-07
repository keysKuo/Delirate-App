import { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image,
	ScrollView,
} from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { useRoute } from "@react-navigation/native";
import alter from "../static/alter.png";
import Config from "../config.dev";
const apiUrl = Config.API_URL;

export default function OrderDetailScreen({ navigation }) {
	const [order, setOrder] = useState({
		store: {
			name: "",
			email: "",
			location: "",
			phone: "",
		},
		customer: {
			name: "",
			email: "",
			address: "",
			phone: "",
		},
		items: [],
	});
	const route = useRoute();
	const { params } = route;

	useEffect(() => {
		if (params && params.data) {
			setOrder({ ...params.data });
		}

	}, []);

	return (
		<ScrollView>
			<View style={styles.container}>
				<View style={[styles.deliveryHeader, styles.infoHeader]}>
					<View
						style={[
							styles.infoBody,
							{ width: "80%", paddingTop: 20 },
						]}
					>
						<Text
							style={{
								color: "white",
								fontSize: 17,
								fontWeight: "bold",
							}}
						>
							Your package is transiting
						</Text>
						<Text
							style={{
								color: "white",
								fontSize: 14,
								paddingVertical: 15,
							}}
						>
							Please make sure that you receive your package
							before 02-12-2023
						</Text>
					</View>
					<View
						style={{
							width: "20%",
							flex: 1,
							justifyContent: "center",
							alignItems: "left",
						}}
					>
						<EntypoIcon name="news" size={50} color={"white"} />
					</View>
				</View>
				<View style={styles.deliveryInfo}>
					<View style={styles.infoHeader}>
						<EntypoIcon name="paper-plane" size={20} />
						<Text
							style={{
								paddingHorizontal: 10,
								fontWeight: "bold",
								fontSize: 17,
							}}
						>
							Delivery information
						</Text>
						<TouchableOpacity
							style={{ position: "absolute", right: 10 }}
						>
							<Text style={styles.highlightText}>DETAIL</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.infoBody}>
						<Text style={{ fontSize: 14 }}>
							<Text style={{ fontWeight: "bold" }}>From:</Text>{" "}
							{order.store.name} - Store
						</Text>
						<Text style={{ fontSize: 14 }}>
							{order.store.location}
						</Text>
						<View style={styles.infoStatus}>
							<Text style={styles.highlightText}>Transiting</Text>
							<Text>{order.createdDateTime}</Text>
						</View>
					</View>
				</View>

				<View style={styles.deliveryInfo}>
					<View style={styles.infoHeader}>
						<EntypoIcon name="location-pin" size={20} />
						<Text
							style={{
								paddingHorizontal: 10,
								fontWeight: "bold",
								fontSize: 17,
							}}
						>
							Receiver information
						</Text>
						<TouchableOpacity
							style={{ position: "absolute", right: 10 }}
						>
							<Text style={styles.highlightText}>COPY</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.infoBody}>
						<Text style={{ fontSize: 14 }}>
							<Text style={{ fontWeight: "bold" }}>To:</Text>{" "}
							{order.customer.name}
						</Text>
						<Text style={{ fontSize: 14 }}>
							{order.customer.phone}
						</Text>
						<Text style={{ fontSize: 14 }}>
							{order.customer.address}
						</Text>
					</View>
				</View>

				<View style={[styles.deliveryInfo, { marginTop: 10 }]}>
					{order.items.map((item, index) => {
						return (
							<View
								style={[
									styles.infoHeader,
									{ paddingRight: '25%', marginTop: 5 },
								]}
							>
								<Image
									style={{ width: 100, height: 100 }}
									source={{ uri: `${apiUrl}/uploads${item.info.image}`}}
								/>
								<View
									style={{
										paddingHorizontal: 15,
										paddingVertical: 5,
									}}
								>
									<Text
										style={{
											flexWrap: "wrap",
											textAlign: "left",
										}}
									>
										{item.info.model}
									</Text>
									<View style={styles.infoHeader}>
										<Text
											style={{
												flexWrap: "wrap",
												textAlign: "left",
												color: "#ccc",
												paddingTop: 5,
											}}
										>
											{item.info.sku}
										</Text>
										<Text
											style={{
												flexWrap: "wrap",
												textAlign: "left",
												color: "#ccc",
												paddingTop: 5,
											}}
										>
											{" "}
											x{item.qty}
										</Text>
									</View>
									<View style={styles.price}>
										<Text style={{ color: "lightcoral" }}>
											${item.price}
										</Text>
									</View>
								</View>
							</View>
						);
					})}
				</View>
				<View
					style={[
						styles.deliveryInfo,
						{
							marginTop: 10,
							justifyContent: "center",
							alignItems: "center",
						},
					]}
				>
					<View style={[styles.infoHeader, styles.infoFooter]}>
						<Text>Total:</Text>
						<Text style={{ color: "lightcoral", paddingLeft: 10 }}>
							${(order.total_price * 1.1).toFixed(2)} (VAT: 10%)
						</Text>
					</View>
					<View style={styles.infoHeader}>
						<TouchableOpacity style={styles.buttonContact}>
							<Text style={{ color: "white" }}>Contact Shop</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.buttonContact,
								{ backgroundColor: "lightcoral" },
							]}
						>
							<Text style={{ color: "white" }}>Cancel Order</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
	},
	deliveryInfo: {
		paddingVertical: 15,
		paddingHorizontal: 10,
		borderColor: "#ccc",
		borderWidth: 0.3,
		backgroundColor: "#fff",
	},
	infoHeader: {
		flexDirection: "row",
	},
	deliveryHeader: {
		height: 120,
		backgroundColor: "#89B9AD",
	},
	infoBody: {
		paddingHorizontal: 30,
		paddingTop: 10,
	},
	infoStatus: {
		height: 50,
		borderLeftWidth: 1,
		borderColor: "#ccc",
		paddingLeft: 10,
		paddingTop: 3,
		marginTop: 10,
	},
	highlightText: {
		color: "#89B9AD",
		fontSize: 15,
		fontWeight: "bold",
	},
	price: {
	},
	infoFooter: {
		paddingHorizontal: 11,
		justifyContent: "space-between",
	},
	buttonContact: {
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 0.2,
		borderColor: "#ccc",
		marginTop: 20,
		height: 40,
		width: "50%",
		backgroundColor: "#313552",
	},
});
