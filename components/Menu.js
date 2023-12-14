import { View, StyleSheet, TouchableHighlight } from "react-native";

export default function Menu({
	menuItems,
	currentPage,
	setCurrentPage,
	setIsLoading,
	qty=1,
	style
}) {
	return (
		<View style={[styles.menu, style]}>
			{menuItems.map((item, index) => {
				return (
					<TouchableHighlight
						key={index}
						style={[
							styles.menuItem,
							{
								borderColor: `${
									currentPage === item ? "#89B9AD" : "#ccc"
								}`,
								width: qty === 2 ? "50%" : qty == 3 ? "33.33%" : "100%",
							},
						]}
						underlayColor="transparent"
						onPress={() => {
							setIsLoading(true);
							setCurrentPage(item);
						}}
					>
						<StyleText
							style={{
								textAlign: "center",
								fontSize: 13,
								textTransform: "uppercase",
								color: `${
									currentPage === item ? "#89B9AD" : "black"
								}`,
							}}
						>
							{item}
						</StyleText>
					</TouchableHighlight>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	menu: {
		flex: 1,
		backgroundColor: "white",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	menuItem: {
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center",
		height: 50,
		borderColor: "#ccc",
		borderBottomWidth: 3,
	},
});
