import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import defaultNavigationOptions from './defaultNavOpts';

import { SearchScreen, ProfileScreen, SinglePostScreen } from '../screens/Screens';

const SearchNavigator = createStackNavigator({
	SearchScreen,
	ProfileScreen,
	SinglePostScreen
}, {
	initialRouteName: 'SearchScreen',
	...defaultNavigationOptions
})


export default createAppContainer(SearchNavigator);
