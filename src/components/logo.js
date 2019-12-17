import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import COLORS from 'snapshindig/assets/colors';

export default class SnapShindigLogo extends Component {
	render() {
		return (
			<View>
				<View style={styles.logoContainer}>
					<View style={styles.textContainer}>
						<View style={styles.textContainerTop}>
							<Text style={styles.text}>Snap</Text>
						</View>
					</View>
					<View style={styles.textContainer}>
						<View style={styles.textContainerBottom}>
							<Text style={styles.text}>Shindig</Text>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	logoContainer: {
		marginVertical: 5,
		alignContent: 'space-around',
		flexDirection: 'column'
	},
	textContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	text: {
		fontSize: 40,
		color: '#FFF',
		paddingHorizontal: 10
	},
	textContainerTop: {
		borderRadius: 8,
		marginLeft: -8,
		borderBottomRightRadius: 0,
		backgroundColor: COLORS.blue
	},
	textContainerBottom: {
		borderRadius: 8,
		marginLeft: 8,
		borderTopLeftRadius: 0,
		backgroundColor: COLORS.blue
	}
})
