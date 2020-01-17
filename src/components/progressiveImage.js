import React from 'react';
import { View, Image, StyleSheet } from 'react-native'

export class ProgressiveImage extends React.Component {

	render() {
		const { thumbnailSource, source, style, ...props } = this.props;
		return (
			<View style={styles.container}>
				<Image
					{...props}
					source={thumbnailSource}
					style={style}
				/>
				<Image
					{...props}
					source={source}
					style={[styles.imageOverlay, style]}
				/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	imageOverlay: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		top: 0,
	},
	container: {
		backgroundColor: '#e1e4e8',
	},
});

// <View style={styles.container}>
// 	<ProgressiveImage
// 		thumbnailSource={{ uri: `https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?w=50&buster=${Math.random()}` }}
// 		source={{ uri: `https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?w=${w.width * 2}&buster=${Math.random()}` }}
// 		style={{ width: w.width, height: w.width }}
// 		resizeMode="cover"
// 	/>
// </View>
// w=50&fit=clip&
