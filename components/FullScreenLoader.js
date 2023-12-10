import React from "react";
import { View, ActivityIndicator, StyleSheet, Dimensions } from "react-native";

const FullScreenLoader = ({ axis = 1 }) => {
	return (
		<View
			style={[
				styles.container,
				{ height: Dimensions.get("window").height * axis },
			]}
		>
			<ActivityIndicator size="huge" color="#89B9AD" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
		width: Dimensions.get("window").width,
		backgroundColor: "rgba(255, 255, 255, 1)",
		// You can adjust the background color and opacity
	},
});

export default FullScreenLoader;
