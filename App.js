import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { AntDesign } from '@expo/vector-icons';

import AppContainer from './src/navigation/TabNavigator';

export default class App extends React.Component {
  state = { isReady: false }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    );
  }

  async _cacheResourcesAsync() {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/icon.png'),
        require('./assets/splash.png')
      ]),
      Font.loadAsync({
        ...AntDesign.font
      })
    ]);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
