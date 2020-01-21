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
const iconRefs = { SearchStack: 'search1', ProfileStack: 'user', HomeStack: 'home' }

/** The navigator for the bottom tab which is constantly visible  */
const BottomTabNavigator = createBottomTabNavigator({
  SearchStack, HomeStack, ProfileStack
}, {
  initialRouteName: 'HomeStack',
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
  render = () => (
    <View>
      <AntDesign name={iconRefs[this.props.route]} size={30} color={this.props.color} />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarComponent: {
    borderTopColor: COLORS.blue,
    borderTopWidth: 1,
    // shadowColor: COLORS.grayDark,
    // shadowOpacity: .8,
    // shadowRadius: 2,
    // shadowOffset: { height: 0, width: 0 }
  }
});

export default createAppContainer(BottomTabNavigator);
