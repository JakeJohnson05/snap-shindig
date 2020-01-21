import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import defaultNavigationOptions from './defaultNavOpts';

import { ProfileScreen, SinglePostScreen, PersonalProfileScreen } from '../screens/Screens';

const ProfileNavigator = createStackNavigator({
	PersonalProfileScreen,
	ProfileScreen,
	SinglePostScreen
}, {
	initialRouteName: 'PersonalProfileScreen',
	...defaultNavigationOptions
})


export default createAppContainer(ProfileNavigator);
