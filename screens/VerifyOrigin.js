import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import AlterImage from '../components/AlterImage';
import Config from '../config.dev';
const VerifyOriginScreen = ({ navigation }) => {
    const route = useRoute();
    const [ tracks, setTracks ] = useState([]);
    const [ items, setItems] = useState([]);
    const [isHovered, setIsHovered] = useState(false);
    
    useEffect(() => {
      const fetchData = async (url) => {
			try {
				const response = await axios.get(url);
				// console.log(response)
				const result = response.data;
				if (result.success) {
					setItems([...result.data.items]);
					setTracks([...result.data._tracking_history]);
				} 
        else {
          // todo
				}
			} catch (error) {
				navigation.navigate("FailOrigin");
			}
		};

        const { params } = route;
        if (params && params.state) {
            fetchData(params.state)
        }
    }, [])

    // console.log(items)


    return (
		<ScrollView contentContainerStyle={styles.container}>
			<FontAwesomeIcon name="check" size={50} color="green" />
			<Text style={styles.text}>Your items are verified</Text>
			<View style={styles.messageContainer}>
				<Text style={styles.cheader}>Significant cautions</Text>
				<View style={styles.list}>
					<Text style={styles.item}>
						{"\u2022"} Please check whether your package is broken.
					</Text>
					<Text style={styles.item}>
						{"\u2022"} Drafts will now auto-save while writing
					</Text>
				</View>
			</View>
			<View>
				{items.map((item, index) => {
          let imageUrl = `${Config.API_URL}/uploads${item.info.image}`;
					return (
						<TouchableOpacity
                            key={index}
							onPressIn={() => setIsHovered(true)}
							onPressOut={() => setIsHovered(false)}
							activeOpacity={1}
							style={styles.itemContainer}
						>
							<AlterImage
								style={styles.image}
								imageUrl={imageUrl}
							/>
							{isHovered && (
								<View style={styles.overlay}>
									<Text style={styles.header}>
										{item.info.model}
									</Text>
									<Text style={styles.meta}>
										${item.price} x {item.qty}
									</Text>
									<Text style={styles.extra}>
										{item.info.brand}
									</Text>
									<Text style={styles.extra}>
										{item.info.origin}
									</Text>
								</View>
							)}
						</TouchableOpacity>
					);
				})}
			</View>

            {/* <TableComponent tracks={tracks} /> */}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: Dimensions.get('window').height
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'green'
  },
  itemContainer: {
    flexDirection: 'row', // Arrange items horizontally
    width: '100%', // Take full width of the screen
    marginBottom: 20, // Add spacing between items
    alignItems: 'center',
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
    backgroundColor: '#e0e0e0',
    marginBottom: 20,
    borderRadius: 5 // Optional background color for the container
  },
  header: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: 'white'
  },
  cheader: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  list: {
    marginLeft: 15, // Indentation for the list items
  },
  item: {
    marginBottom: 5,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  meta: {
    fontSize: 13,
    marginBottom: 5,
    textAlign: 'center',
    color: 'white'
  },
  extra: {
    fontSize: 12,
    textAlign: 'center',
    color: 'white'
  },
});

export default VerifyOriginScreen;
