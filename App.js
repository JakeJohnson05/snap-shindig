import React from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { AntDesign } from '@expo/vector-icons';

import { auth } from './firebaseConfig';

import AppContainer from './src/navigation/tab.navigator';
import LoginContainer from './src/navigation/login.navigator';

export default class App extends React.Component {
  state = { isReady: false, auth: false }
  authStateObs;

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
        {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
        {this.state.auth ? <AppContainer /> : <LoginContainer />}
      </View>
    );
  }

  componentDidMount() {
    if (!this.authStateObs) this.authStateObs = auth.onAuthStateChanged(user => {
      this.setState({ auth: !!user });
    });
  }
  
  componentWillUnmount() {
    if (this.authStateObs) {
      this.auth;
      this.setState({ auth: false });
      this.authStateObs = undefined;
    }
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
