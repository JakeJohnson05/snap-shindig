import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { HomeScreen } from '../screens/Home/HomeScreen'
import { ProfileScreen } from '../screens/Profile/ProfileScreen'

const BottomTabNavigator = createBottomTabNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
});

export default createAppContainer(BottomTabNavigator);
