import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import COLORS from 'snapshindig/assets/colors';

import { HomeScreen } from '../screens/Screens';

const HomeNavigator = createStackNavigator(
	{
		HomeScreen: { screen: HomeScreen }
	}, {
		initialRouteName: 'HomeScreen',
		defaultNavigationOptions: {
			headerStyle: { backgroundColor: COLORS.blue },
			headerTitleStyle: { color: '#FFF' },
			headerTintColor: '#FFF'
		}
	}
)


export default createAppContainer(HomeNavigator);
