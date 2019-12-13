import React from 'react';
import { Text, View } from 'react-native';

export class ProfileScreen extends React.Component {

  static navigationOpts = {
    title: 'Profile'
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile!</Text>
      </View>
    );
  }
}
