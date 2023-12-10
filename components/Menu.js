import { View, StyleSheet, TouchableHighlight } from "react-native";

export default function Menu({
	menuItems,
	currentPage,
	setCurrentPage,
	setIsLoading,
}) {
	return (
		<View style={styles.menu}>
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
							},
						]}
						underlayColor="#DDD"
						onPress={() => {
							setIsLoading(true);
							setCurrentPage(item);
						}}
					>
						<StyleText
							style={{
								textAlign: "center",
								fontSize: 14,
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
		paddingHorizontal: 15,
	},
	menuItem: {
		width: "50%",
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center",
		height: 50,
		borderColor: "#ccc",
		borderBottomWidth: 3,
	},
});
