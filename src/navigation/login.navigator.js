import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import COLORS from 'snapshindig/assets/colors';

import { LoginScreen, RegisterScreen } from '../screens/Screens';

const LoginNavigator = createStackNavigator(
	{
		Login: { screen: LoginScreen },
		Register: { screen: RegisterScreen }
	}, {
		initialRouteName: 'Login',
		defaultNavigationOptions: {
			headerStyle: { backgroundColor: COLORS.blue },
			headerTitleStyle: { color: '#FFF' },
			headerTintColor: '#FFF'
		}
	}
)


export default createAppContainer(LoginNavigator);
