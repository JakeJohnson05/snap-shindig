import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View, Container, Header, Left, Body, Title, Right } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { AntDesign } from '@expo/vector-icons';

import AppContainer from './src/navigation/TabNavigator';

export default class App extends React.Component {
  // state = { isReady: false }
  isLoadingComplete;
  setLoadingComplete;

  constructor() {
    let state = useState(false);
    this.isLoadingComplete = useState[0];
    this.setLoadingComplete = useState[1];
  }

  appLoadingOnError(err) {
    console.log(err);
  }
  appLoadingOnFinish() {
    this.setLoadingComplete(true);
  }

  async ComponentDidDismount() {
    await Promise.all([
      Asset.loadAsync([
        require('./assets/icon.png'),
        require('./assets/splash.png')
      ]),
      Font.loadAsync({ ...AntDesign.Font })
    ]);
    // this.setState({ isReady: true });
  }

  render() {
    if (this.state.isReady) return (
      <AppLoading
        startAsync={this.ComponentDidDismount}
        onError={this.appLoadingOnError}
        onFinish={this.appLoadingOnFinish}
      />
    );

    return (
      <View style={{ flex: 1 }}>
        <Container>
          <Header>
            <Left style={{ flex: 1 }} />
            <Body style={{ flex: 1 }}>
              <Title>Photo Jamboree</Title>
            </Body>
            <Right style={{ flex: 1 }} />
          </Header>
          <AppContainer />
        </Container>
      </View>
    );
  }
}


// export default function App(props) {
//   const [isLoadingComplete, setLoadingComplete] = useState(false);

//   if (!isLoadingComplete && !props.skipLoadingScreen) {
//     return (
//       <AppLoading
//         startAsync={loadResourcesAsync}
//         onError={handleLoadingError}
//         onFinish={() => (setComplete => setComplete(true))(setLoadingComplete)}
//       />
//     );
//   } else {
//     return (
//       <View style={styles.container}>
//         <Container>
//           <Header>
//             <Left style={{ flex: 1 }} />
//             <Body style={{ flex: 1 }} >
//               <Title>Portrait Jamboree</Title>
//             </Body>
//             <Right style={{ flex: 1 }} />
//           </Header>
//         </Container>
//         {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
//         <AppContainer />
//       </View>
//     );
//   }
// }

// async function loadResourcesAsync() {
//   await Promise.all([
//     Asset.loadAsync([
//       require('./assets/icon.png'),
//       require('./assets/splash.png')
//     ]),
//     Font.loadAsync({ ...AntDesign.font }),
//   ]);
// }

// function handleLoadingError(error) {
//   console.warn(error);
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
