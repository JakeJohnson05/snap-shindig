import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import defaultNavigationOptions from './defaultNavOpts';

import { SearchScreen } from '../screens/Screens';

const SearchNavigator = createStackNavigator(
	{
		SearchScreen: { screen: SearchScreen }
	}, {
	initialRouteName: 'SearchScreen',
	defaultNavigationOptions
})


export default createAppContainer(SearchNavigator);
