import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableHighlight,
	TouchableOpacity,
} from "react-native";

import alter from "../static/alter.png";

const HistoryScreen = ({navigation}) => {
	const [currentPage, setCurrentPage] = useState("page1");

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
			<View style={styles.content}>
				{currentPage === "page1" && (
					<>
						<TouchableOpacity onPress={() => {
              navigation.navigate('Order Detail')
            }} style={styles.orderContainer}>
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
									style={{ fontSize: 16, fontWeight: "bold" }}
								>
									LINKEETECH - Super market
								</Text>
								<Text
									style={{
										paddingTop: 2,
										fontSize: 13,
										color: "#ccc",
									}}
								>
									09-14-2023
								</Text>
							</View>

							<View
								style={[styles.deliveryInfo, { marginTop: 10 }]}
							>
								<View
									style={[
										styles.infoHeader,
										{ paddingRight: "20%" },
									]}
								>
									<Image
										style={{ width: 100, height: 100 }}
										source={alter}
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
												fontWeight: "bold",
											}}
										>
											(FNK Vision) Camera IP Wifi Yoosee
										</Text>
										<View style={styles.infoHeader}>
											<Text
												style={{
													flexWrap: "wrap",
													textAlign: "left",
													paddingTop: 5,
												}}
											>
												94/20 Thanh Loc 16 Q12
											</Text>
										</View>
										<View style={styles.infoHeader}>
											<Text
												style={{
													color: "lightcoral",
													paddingTop: 5,
												}}
											>
												$29.99{" "}
											</Text>
											<Text style={{ paddingTop: 5 }}>
												{" "}
												(x1) - Cash
											</Text>
										</View>
									</View>
								</View>
							</View>
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
                    position: 'absolute',
                    right: 15,
                    bottom: 12
									}}
								>
									Arriving
								</Text>
								
							</View>
						</TouchableOpacity>
						<TouchableOpacity style={styles.orderContainer}>
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
									style={{ fontSize: 16, fontWeight: "bold" }}
								>
									LINKEETECH - Super market
								</Text>
								<Text
									style={{
										paddingTop: 2,
										fontSize: 13,
										color: "#ccc",
									}}
								>
									09-14-2023
								</Text>
							</View>

							<View
								style={[styles.deliveryInfo, { marginTop: 10 }]}
							>
								<View
									style={[
										styles.infoHeader,
										{ paddingRight: "20%" },
									]}
								>
									<Image
										style={{ width: 100, height: 100 }}
										source={alter}
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
												fontWeight: "bold",
											}}
										>
											(FNK Vision) Camera IP Wifi Yoosee
										</Text>
										<View style={styles.infoHeader}>
											<Text
												style={{
													flexWrap: "wrap",
													textAlign: "left",
													paddingTop: 5,
												}}
											>
												94/20 Thanh Loc 16 Q12
											</Text>
										</View>
										<View style={styles.infoHeader}>
											<Text
												style={{
													color: "lightcoral",
													paddingTop: 5,
												}}
											>
												$29.99{" "}
											</Text>
											<Text style={{ paddingTop: 5 }}>
												{" "}
												(x1) - Cash
											</Text>
										</View>
									</View>
								</View>
							</View>
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
                    position: 'absolute',
                    right: 15,
                    bottom: 12
									}}
								>
									Transiting
								</Text>
								
							</View>
						</TouchableOpacity>
					</>
				)}
				{currentPage === "page2" && <Text>Page 2 Content</Text>}
				{currentPage === "page3" && <Text>Page 3 Content</Text>}
			</View>
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
