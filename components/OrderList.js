import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import StyleText from "../components/StyleText";

import Config from "../config.dev";

const apiUrl = Config.API_URL;

export default function OrderList({ navigation, orders }) {
	return (
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
								{order.store.name}
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
											borderBottomColor: "#ccc",
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
														paddingTop: 5,
														color: "#ccc",
													}}
												>
													{item.info.sku}
												</StyleText>
											</View>
											<View style={styles.infoHeader}>
												<StyleText
													style={{
														color: "lightcoral",
														paddingTop: 5,
													}}
												>
													${item.info.price}{" "}
												</StyleText>
												<StyleText
													style={{
														paddingTop: 5,
													}}
												>
													{" "}
													(x{item.qty}) -{" "}
													{order.payment_type}
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
									color: order.status === "Finished" ? "#89B9AD" : order.status === "Canceled" ? "lightcoral" : "#7C93C3",

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
	);
}

const styles = StyleSheet.create({
	orderContainer: {
		marginBottom: 10,
		backgroundColor: "white",
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
