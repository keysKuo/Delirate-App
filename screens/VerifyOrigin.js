import { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Image,
	Dimensions,
	
} from "react-native";
import Modal from 'react-native-modal';

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

import Config from "../config.dev";
import { ListItem, Avatar, Icon } from "@rneui/themed";
import Menu from "../components/Menu";
import StyleText from "../components/StyleText";

const apiUrl = Config.API_URL;

const menuItems = ["Orders", "Trackings"];

const VerifyOriginScreen = ({ navigation }) => {
	const route = useRoute();
	const [tracks, setTracks] = useState([]);
	const [items, setItems] = useState([]);
	const [currentPage, setCurrentPage] = useState("Orders");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchData = async (url) => {
			try {
				const response = await axios.get(url);
				console.log(url)
				const result = response.data;
				if (result.success) {
					// console.log(result.data._tracking_history);
					setItems([...result.data.items]);
					setTracks([...result.data._tracking_history.reverse()]);
				} else {
					// todo
				}
			} catch (error) {
				navigation.navigate("FailOrigin");
			}
		};

		const { params } = route;
		if (params && params.state) {
			fetchData(params.state);
		}
	}, []);


	// Modal Image
	const [isModalVisible, setModalVisible] = useState(false);
	const [selectedTrack, setSelectedTrack] = useState(null);

	const toggleModal = (track) => {
		setSelectedTrack(track);
		setModalVisible(!isModalVisible);
	};


	return (
		<View style={styles.container}>
			<View style={{ height: 90 }}></View>
			<View style={styles.headerContainer}>
				<FontAwesomeIcon name="check" size={50} color="#89B9AD" />
				<StyleText style={styles.text}>
					Your items are verified
				</StyleText>
				<View style={styles.messageContainer}>
					<StyleText style={styles.cheader}>
						Significant cautions
					</StyleText>
					<View style={styles.list}>
						<StyleText style={styles.item}>
							{"\u2022"} Check whether your package is broken.
						</StyleText>
						<StyleText style={styles.item}>
							{"\u2022"} Don't share this code with anybody else.
						</StyleText>
						<StyleText style={styles.item}>
							{"\u2022"} Drafts will now auto-save while writing.
						</StyleText>
					</View>
				</View>
			</View>
			<Menu
				menuItems={menuItems}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				setIsLoading={setIsLoading}
				qty={2}
				style={{ paddingHorizontal: 15, marginBottom: 0 }}
			/>

			<View style={{ width: "100%", backgroundColor: "white" }}>
				<ScrollView style={[styles.slider]}>
					{currentPage == "Orders" ? (
						items.map((item, index) => {
							return (
								<ListItem key={index} bottomDivider>
									<Avatar
										rounded
										style={{ marginLeft: 10 }}
										source={{
											uri: `${apiUrl}/uploads${item.info.image}`,
										}}
										avatarStyle={{
											width: 50,
											height: 50,
										}} // Adjust width and height as needed
									/>
									<ListItem.Content>
										<View
											style={{
												flexDirection: "column",
												justifyContent: "space-between",
												width: 280,
											}}
										>
											<StyleText style={{ fontSize: 15 }}>
												{item.info.model}
											</StyleText>
											<View
												style={{
													flexDirection: "row",
													justifyContent:
														"space-between",
													width: 280,
												}}
											>
												<StyleText
													style={{
														fontSize: 13,
														color: "grey",
													}}
												>
													{item.info.sku}
												</StyleText>
												<StyleText
													style={{
														fontSize: 13,
														textAlign: "right",
														color: "lightcoral",
													}}
												>
													$
													{parseFloat(
														item.price
													).toFixed(2)}{" "}
												</StyleText>
											</View>
										</View>
									</ListItem.Content>
								</ListItem>
							);
						})
					) : (
						// <FullScreenLoader axis={0.4} />
						<View style={[styles.center, { padding: 10 }]}>
							<View style={styles.trackingNum}>
								<ListItem
									containerStyle={{
										backgroundColor: "transparent",
									}}
								>
									<Avatar
										rounded
										style={{ marginTop: 4, marginLeft: 10 }}
										source={require("../static/package.png")}
										avatarStyle={{
											width: 32,
											height: 32,
										}} // Adjust width and height as needed
									/>
									<ListItem.Content>
										<View
											style={{
												flexDirection: "column",
												justifyContent: "space-between",
												width: 280,
											}}
										>
											<StyleText style={{ fontSize: 15 }}>
												DE{tracks[0]._timestamp}
											</StyleText>
											<View
												style={{
													flexDirection: "row",
													justifyContent:
														"space-between",
													width: 250,
												}}
											>
												<StyleText
													style={{
														fontSize: 13,
														color: "#89B9AD",
													}}
												>
													{
														tracks[0]._status
													}
												</StyleText>
												<StyleText
													style={{
														fontSize: 13,
														textAlign: "right",
														color: "#ccc",
														position: "absolute",
														right: 3,
														bottom: 5,
													}}
												>
													<Icon
														name="content-copy"
														color="#ccc"
													/>
												</StyleText>
											</View>
										</View>
									</ListItem.Content>
								</ListItem>
							</View>

							<ScrollView style={styles.slider}>
								<View style={styles.center}>
									<ScrollView style={styles.trackingBody}>
										<View style={{padding: 10}} >
											
											{tracks.map((track, index) => {
												let timestamp = new Date(parseInt(track._timestamp) / 1000000).toLocaleString('vi-vn');
												return (
													<View key={index} style={styles.trackingStatus}>
														<Icon
															name="check-circle"
															color="#89B9AD"
															size={15}
															containerStyle={{ position: 'absolute', top: -2, left: -8.4, zIndex: 2 }}
														/>
														<View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
															<View style={{ flexDirection: 'column'}}>
																<StyleText>{track._note}</StyleText>
																<StyleText style={{ color: 'grey', fontSize: 13}}>{timestamp}</StyleText>
																<StyleText style={{ color: '#89B9AD', fontSize: 13}}>{track._status}</StyleText>

																
															</View>
																
														</View>
															{index !== tracks.length -1 && 
															(<TouchableOpacity onPress={() => toggleModal(track)} style={styles.imgStatus}>
															<Image style={{width: 60, height: 60}} source={{ uri: `${apiUrl}/uploads${track._image}`}} />
														</TouchableOpacity>)}
													</View>
												)
											})}
											
										</View>
										
										
										
									</ScrollView>

									
								</View>

								
							</ScrollView>
							<View style={styles.contactBtn}>
									<Icon name="call" color="white" size={16} />
									<StyleText style={{color: 'white', fontSize: 15}}> Contact us</StyleText>
							</View>
						</View>
					)}
				</ScrollView>

				<Modal isVisible={isModalVisible}>
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					{selectedTrack && (
						<Image style={{ width: 200, height: 300 }} source={{ uri: `${apiUrl}/uploads${selectedTrack._image}` }} />
					)}
					<TouchableOpacity onPress={() => {
						toggleModal(null);
					}} style={{ position: 'absolute', bottom: 50,}}>
						<Icon name="close" color="white" size={32}/>
					</TouchableOpacity>
					</View>
				</Modal>
			</View>

			<TouchableOpacity onPress={() => {
				navigation.navigate("Home")
			}}  style={styles.btnBackToHome}>
				<Icon name="arrow-back" />
			</TouchableOpacity>

			{/* <TableComponent tracks={tracks} /> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		height: Dimensions.get("screen").height,
	},
	center: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	headerContainer: {
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		height: 250,
	},
	text: {
		fontSize: 20,
		marginBottom: 30,
		color: "#89B9AD",
	},
	itemContainer: {
		flexDirection: "row", // Arrange items horizontally
		width: "100%", // Take full width of the screen
		marginBottom: 20, // Add spacing between items
		alignItems: "center",
	},
	image: {
		width: 200,
		height: 200,
		marginRight: 10, // Add spacing between image and info box
	},
	infoBox: {
		flex: 1, // Take remaining space
	},
	messageContainer: {
		padding: 10,
		backgroundColor: "#313552",
		marginBottom: 20,
		borderRadius: 5, // Optional background color for the container
	},
	header: {
		fontSize: 15,
		marginBottom: 5,
		textAlign: "center",
		color: "white",
	},
	cheader: {
		fontSize: 15,
		marginBottom: 5,
		textAlign: "center",
		color: "white",
	},
	list: {
		marginHorizontal: 15, // Indentation for the list items
	},
	item: {
		marginBottom: 5,
		color: "#ccc",
	},
	overlay: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		top: 0,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		padding: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	meta: {
		fontSize: 13,
		marginBottom: 5,
		textAlign: "center",
		color: "white",
	},
	extra: {
		fontSize: 12,
		textAlign: "center",
		color: "white",
	},
	slider: {
		flexDirection: "column", // Set flexDirection to column
		// alignItems: "center",
		// justifyContent: "center",
		width: "100%",
		height: 430,
		marginBottom: 50,
	},
	trackingNum: {
		width: "90%",
		height: 70,
		backgroundColor: "rgba(0,0,0, 0.05)",
		marginTop: 10,
		borderRadius: 10,
		marginBottom: 15,
	},
	trackingStatus: {
		flex: 1,
		flexDirection: 'column',
		borderWidth: 0,
		borderStyle: "dashed",
		borderLeftWidth: 1,
		borderColor: "rgba(0,0,0, 0.15)",
		width: "90%",
		height: 80,
		paddingHorizontal: 17
	},
	trackingBody: {
		width: '90%',
		paddingLeft: 25,
		paddingVertical: 15,
		backgroundColor: "rgba(0,0,0, 0.05)",
		borderRadius: 10,
		// maxHeight: 350
	},
	imgStatus: {
		width: 60,
		height: 60,
		position: 'absolute',
		right: -15,
		top: -5
	},
	contactBtn: {
		width: '100%',
		backgroundColor: '#313552',
		height: 45,
		marginVertical: 20,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		position: 'absolute',
		bottom: 0,
		borderRadius: 7
	},
	btnBackToHome: {
		width: 60,
		height: 50,
		position: 'absolute',
		top: 35,
		left: 0

	}
});

export default VerifyOriginScreen;
