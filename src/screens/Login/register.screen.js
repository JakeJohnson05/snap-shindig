import React from 'react';
import { StyleSheet, View } from 'react-native';

import { auth } from '../../../firebaseConfig';


export class RegisterScreen extends React.Component {

	static navigationOptions = {
		title: 'Register'
	}

	render() {
		return (
			<View style={styles.container}>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})
