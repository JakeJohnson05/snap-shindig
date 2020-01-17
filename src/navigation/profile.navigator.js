import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import defaultNavigationOptions from './defaultNavOpts';

import { ProfileScreen } from '../screens/Screens';

const ProfileNavigator = createStackNavigator(
	{
		ProfileScreen: { screen: ProfileScreen }
	}, {
		initialRouteName: 'ProfileScreen',
		defaultNavigationOptions
})


export default createAppContainer(ProfileNavigator);
