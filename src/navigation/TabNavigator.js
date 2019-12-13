import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { AntDesign } from '@expo/vector-icons';

import COLORS from 'snapshindig/assets/colors';
import { HomeScreen, ProfileScreen, SearchScreen } from '../screens/Screens';

/** Stores the icons for each of the route names */
const iconRefs = { Search: 'search1', Profile: 'user', Home: 'home' }
/** Renders the icon for a tab bar option */
class BottomTabBarIcon extends React.Component {
  render() {
    const { color, route } = this.props;

    return (
      <View style={styles.tabBarIcon}>
        <AntDesign name={iconRefs[route]} size={30} color={color} />
      </View>
    )
  }
}

/** The navigator for the bottom tab which is constantly visible  */
const BottomTabNavigator = createBottomTabNavigator({
  Search: {
    screen: SearchScreen, navigationOptions: SearchScreen.navigationOpts
  },
  Home: {
    screen: HomeScreen, navigationOptions: HomeScreen.navigationOpts
  },
  Profile: {
    screen: ProfileScreen, navigationOptions: ProfileScreen.navigationOpts
  }
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => <BottomTabBarIcon route={navigation.state.routeName} color={tintColor} />
  }),
  initialRouteName: 'Home',
  tabBarOptions: {
    activeTintColor: COLORS.blue,
    inactiveTintColor: COLORS.grayLight,
    showLabel: false
  },
  tabBarComponent: props => <TabBarComponent {...props} />
});

const TabBarComponent = props => <BottomTabBar {...props} style={styles.tabBarComponent} />

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
    shadowOffset: {
      height: 0,
      width: 0
    },
    shadowOpacity: 1,
    shadowRadius: 2
  },
  tabBarIcon: {}
});


export default createAppContainer(BottomTabNavigator);
