import { Text } from "react-native";

// SplashScreen.preventAutoHideAsync();

export default StyleText = ({ style, children, ...props }) => {
	
	return (
		<Text {...props} style={[style, { fontFamily: "Ubuntu" }]}>
			{children}
		</Text>
	);
};
