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
import StyleText from "../components/StyleText";

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
						<StyleText
							style={{
								color: "white",
								fontSize: 17,
								
							}}
						>
							Your package is transiting
						</StyleText>
						<StyleText
							style={{
								color: "white",
								fontSize: 14,
								paddingVertical: 15,
							}}
						>
							Please make sure that you receive your package
							before 02-12-2023
						</StyleText>
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
						<StyleText
							style={{
								paddingHorizontal: 10,
								
								fontSize: 17,
							}}
						>
							Delivery information
						</StyleText>
						<TouchableOpacity
							style={{ position: "absolute", right: 10 }}
						>
							<StyleText style={styles.highlightText}>DETAIL</StyleText>
						</TouchableOpacity>
					</View>

					<View style={styles.infoBody}>
						<StyleText style={{ fontSize: 14 }}>
							<StyleText style={{ fontWeight: "bold" }}>From:</StyleText>{" "}
							{order.store.name} - Store
						</StyleText>
						<StyleText style={{ fontSize: 14 }}>
							{order.store.location}
						</StyleText>
						<View style={styles.infoStatus}>
							<StyleText style={styles.highlightText}>Transiting</StyleText>
							<StyleText>{order.createdDateTime}</StyleText>
						</View>
					</View>
				</View>

				<View style={styles.deliveryInfo}>
					<View style={styles.infoHeader}>
						<EntypoIcon name="location-pin" size={20} />
						<StyleText
							style={{
								paddingHorizontal: 10,
								
								fontSize: 17,
							}}
						>
							Receiver information
						</StyleText>
						<TouchableOpacity
							style={{ position: "absolute", right: 10 }}
						>
							<StyleText style={styles.highlightText}>COPY</StyleText>
						</TouchableOpacity>
					</View>

					<View style={styles.infoBody}>
						<StyleText style={{ fontSize: 14 }}>
							<StyleText style={{ fontWeight: "bold" }}>To:</StyleText>{" "}
							{order.customer.name}
						</StyleText>
						<StyleText style={{ fontSize: 14 }}>
							{order.customer.phone}
						</StyleText>
						<StyleText style={{ fontSize: 14 }}>
							{order.customer.address}
						</StyleText>
					</View>
				</View>

				<View style={[styles.deliveryInfo, { marginTop: 10 }]}>
					{order.items.map((item, index) => {
						return (
							<View
								key={index}
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
									<StyleText
										style={{
											flexWrap: "wrap",
											textAlign: "left",
										}}
									>
										{item.info.model}
									</StyleText>
									<View style={styles.infoHeader}>
										<StyleText
											style={{
												flexWrap: "wrap",
												textAlign: "left",
												color: "#ccc",
												paddingTop: 5,
											}}
										>
											{item.info.sku}
										</StyleText>
										<StyleText
											style={{
												flexWrap: "wrap",
												textAlign: "left",
												color: "#ccc",
												paddingTop: 5,
											}}
										>
											{" "}
											x{item.qty}
										</StyleText>
									</View>
									<View style={styles.price}>
										<StyleText style={{ color: "lightcoral" }}>
											${item.price}
										</StyleText>
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
						<StyleText>Total:</StyleText>
						<StyleText style={{ color: "lightcoral", paddingLeft: 10 }}>
							${(order.total_price * 1.1).toFixed(2)} (VAT: 10%)
						</StyleText>
					</View>
					<View style={styles.infoHeader}>
						<TouchableOpacity style={styles.buttonContact}>
							<StyleText style={{ color: "white" }}>Contact Shop</StyleText>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.buttonContact,
								{ backgroundColor: "lightcoral" },
							]}
						>
							<StyleText style={{ color: "white" }}>Cancel Order</StyleText>
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
