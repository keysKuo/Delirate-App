import React from 'react';
import { View, Image, Text } from 'react-native';

const AlterImage = ( { imageUrl} ) => {;
  const alternativeImageSource = require('../static/alter.png'); // Replace with the path to your static image

  const handleImageError = () => {
    // Handle image loading error here (e.g., show a placeholder or retry loading)
    console.log('Image loading failed!');
  };

  return (
		<View>
			{imageUrl ? (
				<Image
					source={{ uri: imageUrl }}
					style={{ width: 200, height: 200 }}
					onError={handleImageError}
				/>
			) : (
				<Image
					source={alternativeImageSource}
					style={{ width: 200, height: 200 }}
				/>
			)}
		</View>
  );
};

export default AlterImage;
