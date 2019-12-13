import React from 'react';
import { Text, View } from 'react-native';

export class SearchScreen extends React.Component {

  static navigationOpts = {
    title: 'Search'
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Search!</Text>
      </View>
    );
  }
}
