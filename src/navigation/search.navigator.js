import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import COLORS from 'snapshindig/assets/colors';

import { SearchScreen } from '../screens/Screens';

const SearchNavigator = createStackNavigator(
	{
		SearchScreen: { screen: SearchScreen }
	}, {
		initialRouteName: 'SearchScreen',
		defaultNavigationOptions: {
			headerStyle: { backgroundColor: COLORS.blue },
			headerTitleStyle: { color: '#FFF' },
			headerTintColor: '#FFF'
		}
	}
)


export default createAppContainer(SearchNavigator);
