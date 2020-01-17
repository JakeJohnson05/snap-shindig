import React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

import ENV_VARS from '../../../env';
import COLORS from 'snapshindig/assets/colors';
import { auth } from 'snapshindig/firebaseConfig';

import SnapShindigLogo from 'snapshindig/src/components/logo';

export class LoginScreen extends React.Component {
	static navigationOptions = { title: 'Log In', headerBackTitle: 'Log In', headerTruncatedBackTitle: 'Log In' }
	state = { email: '', password: '', invalidCredentials: false }

	render = () => (
		<View style={styles.container}>
			<SnapShindigLogo />

			<View style={styles.textContainer}>
				{this.state.invalidCredentials && <InvalidCredentials />}
				<TextInput style={styles.textInput} placeholder="Email" value={this.state.email} onChangeText={email => this.setState({ email })} autoCapitalize="none" textContentType="emailAddress" autoCompleteType="email" />
				<TextInput style={styles.textInput} placeholder="Password" value={this.state.password} onChangeText={password => this.setState({ password })} autoCapitalize="none" textContentType="password" autoCompleteType="password" secureTextEntry />
			</View>

			<View style={styles.bottomButtons}>
				<View style={styles.loginButtonContainer}>
					<Button title="Log In" color={COLORS.blue} onPress={() => this.login()} disabled={!this.state.email || !this.state.password} />
				</View>
				
				{/* TODO: Remove this before production */}
				<View style={styles.loginButtonContainer}><Button title="Dev Log In" color={COLORS.blue} onPress={() => this.devLogin()} /></View>

				<Button title="Don't have an account? Sign Up!" onPress={() => this.props.navigation.navigate('Register')} color={COLORS.blue} />
			</View>
		</View>
	);

	login = () => auth.signInWithEmailAndPassword(this.state.email, this.state.password).catch(err => err && this.setState({ invalidCredentials: true }));
	devLogin = () => auth.signInWithEmailAndPassword(ENV_VARS.devCreds.email, ENV_VARS.devCreds.pass).catch(err => err && this.setState({ invalidCredentials: true }));
}

class InvalidCredentials extends React.Component {
	render = () => (
		<View style={styles.invalidCredentials}>
			<Text style={styles.invalidCredentialsText}>Invalid Email or Password.</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 8,
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	textContainer: {
		width: '90%',
		maxWidth: 500
	},
	textInput: {
		borderBottomWidth: 4,
		borderBottomColor: COLORS.blue,
		fontSize: 18,
		padding: 4,
		marginVertical: 8
	},
	bottomButtons: {
		justifyContent: 'space-between',
		width: '90%',
		maxWidth: 400
	},
	loginButtonContainer: {
		// backgroundColor: COLORS.blue,
		borderColor: COLORS.blue,
		borderWidth: 2,
		borderRadius: 8,
		marginTop: 8,
		width: '100%'
	},
	invalidCredentials: {
		borderWidth: 1,
		borderRadius: 8,
		borderColor: 'red',
		paddingVertical: 8,
		paddingHorizontal: 4,
		marginHorizontal: 8
	},
	invalidCredentialsText: {
		color: 'red',
		fontSize: 14,
		textAlign: 'center'
	}
})
