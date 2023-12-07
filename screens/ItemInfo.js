import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image,
	ScrollView,
	Dimensions,
    Alert
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import alter from "../static/alter.png";
import Config from "../config.dev";
import { Rating, AirbnbRating } from "react-native-elements";
import { WebView } from "react-native-webview";

const apiUrl = Config.API_URL;

const ItemInfoScreen = ({ navigator }) => {
	const route = useRoute();
	const [item, setItem] = useState({});

	useEffect(() => {
		const { params } = route;
		if (params && params.item) {
			setItem({ ...params.item });
		}
	}, []);
    
    const handleAddToCart = () => {
        Alert.alert(
            "Add to cart", // Title of the dialog
            "Item added to your cart", // Message of the dialog
            [
                { text: "OK" }, // Button to dismiss the dialog
            ],
            { cancelable: false } // Prevents the alert from being dismissed by tapping outside of the alert box
        );
    }

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Image
					style={styles.imageInfo}
					source={{ uri: `${apiUrl}/uploads${item.image}` }}
				/>
			</View>

			<View style={styles.itemBody}>
				<Text style={styles.itemHeader}>{item.model}</Text>
				<View style={styles.row}>
					<Text style={styles.itemSku}>{item.sku}</Text>
					<Text style={styles.itemPrice}>${item.price}</Text>
				</View>
				<View style={styles.row}>
					<Rating
						count={5}
						readonly
						startingValue={4}
						imageSize={15}
					/>
					<Text>
						Save 10% with{" "}
						<Text style={{ color: "rgb(113, 178, 128)" }}>
							{item.price * 0.9} Near
						</Text>
					</Text>
				</View>

				<ScrollView style={{ maxHeight: 250, marginHorizontal: -9 }}>
					<WebView
						style={{ height: 250, width: 1100 }}
						originWhitelist={["*"]}
						source={{ html: item.desc }}
						scalesPageToFit={true}
						injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);`}
					/>
				</ScrollView>
			</View>

			<TouchableOpacity onPress={handleAddToCart} style={styles.btnAddToCart}>
				<Text style={{ color: "#fff" }}>Add to cart</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
	},
	imageContainer: {
		paddingHorizontal: 20,
		backgroundColor: "white",
	},
	imageInfo: {
		width: 350,
		height: 350,
	},
	itemBody: {
		padding: 20,
		marginTop: 10,
		backgroundColor: "white",
	},
	itemHeader: {
		fontSize: 20,
		fontWeight: "bold",
		paddingBottom: 10,
		textTransform: "uppercase",
	},
	itemSku: {
		fontSize: 15,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingBottom: 10,
	},
	itemPrice: {
		color: "crimson",
		fontSize: 15,
	},
	btnAddToCart: {
		width: Dimensions.get("window").width,
		height: 56,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#89B9AD",
	},
});

export default ItemInfoScreen;
