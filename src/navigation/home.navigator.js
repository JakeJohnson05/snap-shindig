import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import defaultNavigationOptions from './defaultNavOpts';

import { HomeScreen, ProfileScreen, SinglePostScreen } from '../screens/Screens';

const HomeNavigator = createStackNavigator({
	HomeScreen,
	ProfileScreen,
	SinglePostScreen
}, {
	initialRouteName: 'HomeScreen',
	...defaultNavigationOptions
})


export default createAppContainer(HomeNavigator);
