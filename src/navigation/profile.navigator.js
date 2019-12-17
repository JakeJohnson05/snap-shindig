import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import COLORS from 'snapshindig/assets/colors';

import { ProfileScreen } from '../screens/Screens';

const ProfileNavigator = createStackNavigator(
	{
		ProfileScreen: { screen: ProfileScreen }
	}, {
		initialRouteName: 'ProfileScreen',
		defaultNavigationOptions: {
			headerStyle: { backgroundColor: COLORS.blue },
			headerTitleStyle: { color: '#FFF' },
			headerTintColor: '#FFF'
		}
	}
)


export default createAppContainer(ProfileNavigator);
