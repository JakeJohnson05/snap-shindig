import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import defaultNavigationOptions from './defaultNavOpts';

import { LoginScreen, RegisterScreen } from '../screens/Screens';

const LoginNavigator = createStackNavigator(
	{
		Login: { screen: LoginScreen },
		Register: { screen: RegisterScreen }
	}, {
	initialRouteName: 'Login',
	defaultNavigationOptions
})


export default createAppContainer(LoginNavigator);
