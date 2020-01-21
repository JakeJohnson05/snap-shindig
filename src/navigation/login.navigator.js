import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import defaultNavigationOptions from './defaultNavOpts';

import { LoginScreen, RegisterScreen } from '../screens/Screens';

const LoginNavigator = createStackNavigator({
	Login: LoginScreen,
	Register: RegisterScreen
}, {
	initialRouteName: 'Login',
	...defaultNavigationOptions
})


export default createAppContainer(LoginNavigator);
