import { useState, useRef, useEffect } from 'react';
import { FlatList, View, Image, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const images = [
	{ id: '4', uri: require('../static/shipping.png') },
	{ id: '5', uri: require('../static/verification.png') },
	{ id: '1', uri: require('../static/search.png') },
	{ id: '2', uri: require('../static/progress.png') },
  	{ id: '3', uri: require('../static/export.png') },
  // Add more images as needed
];

const ImageSlider = ({...props}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef();

    useEffect(() => {
		const timer = setInterval(() => {
			const nextIndex = (currentIndex + 1) % images.length;
			setCurrentIndex(nextIndex);
			flatListRef.current.scrollToIndex({
				animated: true,
				index: nextIndex,
			});
		}, 1500);

		return () => clearInterval(timer);
	}, [currentIndex, images.length]);


    return (
		<FlatList
            ref={flatListRef}
			data={images}
			{...props}
			keyExtractor={(item) => item.id}
			horizontal
			pagingEnabled
			renderItem={({ item }) => (
				<View style={{ width: width * 0.8, height: 300 }}>
					<Image
						source={item.uri}
						style={{ width: width * 0.8, height: 300 }}
						resizeMode="contain"
					/>
				</View>
			)}
		/>
	);
} 

export default ImageSlider;
