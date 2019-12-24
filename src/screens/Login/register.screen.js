import React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

import COLORS from 'snapshindig/assets/colors';
import { auth } from '../../../firebaseConfig';

import SnapShindigLogo from 'snapshindig/src/components/logo';

export class RegisterScreen extends React.Component {
	static navigationOptions = { title: 'Sign Up' }
	state = { email: '', password: '', invalid: undefined }
	inputRefs = {};

	render = () => (
		<View style={styles.container}>
			<SnapShindigLogo />
			<View style={styles.textContainer}>
				{this.state.invalid && <InvalidCredentials errMsg={this.state.invalid} />}
				<TextInput ref={input => this.inputRefs.email = input} onSubmitEditing={() => this.inputRefs.password.focus()} style={styles.textInput} placeholder="Email" value={this.state.email} onChangeText={email => this.setState({ email })} autoCapitalize="none" textContentType="emailAddress" autoCompleteType="email" returnKeyLabel="next" returnKeyType="next" />
				<TextInput ref={input => this.inputRefs.password = input} onSubmitEditing={() => this.state.email && this.state.password && this.register()} style={styles.textInput} placeholder="Password" value={this.state.password} onChangeText={password => this.setState({ password })} autoCapitalize="none" textContentType="password" autoCompleteType="password" secureTextEntry returnKeyLabel="done" returnKeyType="done" />
			</View>
			<View style={styles.bottomButtons}>
				<View style={styles.loginButtonContainer}>
					<Button title="Sign Up" color={COLORS.blue} onPress={() => this.register()} disabled={!this.state.email || !this.state.password} />
				</View>
				<Button title="Already have an account? Sign In!" onPress={() => this.props.navigation.goBack()} color={COLORS.blue} />
			</View>
		</View>
	);

	register() {
		const { email, password } = this.state;
		auth.createUserWithEmailAndPassword(email, password).catch(({ code }) => {
			if (!code) this.setState({ invalid: undefined });
			else switch (code) {
				case 'auth/email-already-in-use':
					this.setState({ invalid: 'An account with that email already exists.' });
					this.inputRefs.email.focus();
					break;
				case 'auth/invalid-email':
					this.setState({ invalid: 'Please enter a valid email address.' });
					this.inputRefs.email.focus();
					break;
				case 'auth/weak-password':
					this.setState({ invalid: 'Password too weak. Please use a stronger password.' });
					this.inputRefs.password.focus();
					break;
				// case 'auth/operation-not-allowed':
				// 	break;
				default:
					this.setState({ invalid: 'An unexpected error occurred. Please try again later.' });
					break;
			}
		});
	}
}

class InvalidCredentials extends React.Component {
	render = () => (
		<View style={styles.invalidCredentials}>
			<Text style={styles.invalidCredentialsText}>{this.props.errMsg}</Text>
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
