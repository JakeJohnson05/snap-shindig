import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import defaultNavigationOptions from './defaultNavOpts';

import { HomeScreen } from '../screens/Screens';

const HomeNavigator = createStackNavigator(
	{
		HomeScreen: { screen: HomeScreen }
	}, {
	initialRouteName: 'HomeScreen',
	defaultNavigationOptions
})


export default createAppContainer(HomeNavigator);
