import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { AntDesign } from '@expo/vector-icons';

import COLORS from 'snapshindig/assets/colors';

import ProfileStack from './profile.navigator';
import HomeStack from './home.navigator';
import SearchStack from './search.navigator';

/** Stores the icons for each of the route names */
const iconRefs = { Search: 'search1', Profile: 'user', Home: 'home' }

/** The navigator for the bottom tab which is constantly visible  */
const BottomTabNavigator = createBottomTabNavigator({
  Search: { screen: SearchStack },
  Home: { screen: HomeStack },
  Profile: { screen: ProfileStack }
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => <BottomTabBarIcon route={navigation.state.routeName} color={tintColor} />
  }),
  tabBarOptions: {
    activeTintColor: COLORS.blue,
    inactiveTintColor: COLORS.grayLight,
    showLabel: false
  },
  tabBarComponent: props => <TabBarComponent {...props} />
});

/** Creates the BottomTabBar with the style and props */
const TabBarComponent = props => <BottomTabBar {...props} style={styles.tabBarComponent} />
/** Renders the icon for a tab bar option */
class BottomTabBarIcon extends React.Component {
  render = () => <View>
    <AntDesign name={iconRefs[this.props.route]} size={30} color={this.props.color} />
  </View>
}

const styles = StyleSheet.create({
  tabBarComponent: {
    borderTopColor: COLORS.blue,
    borderRightColor: COLORS.blue,
    borderLeftColor: COLORS.blue,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    shadowColor: COLORS.grayLight,
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0
    }
  }
});

export default createAppContainer(BottomTabNavigator);
