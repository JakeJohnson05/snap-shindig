import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { posts, storage, users } from '../../../firebaseConfig';

import Post from '../../components/post';

export class HomeScreen extends React.Component {
  state = { posts: [] }

  static navigationOpts = {
    title: 'Home'
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.posts}
          renderItem={({ item }) => <Post postData={item} />}
        />
      </View>
    );
  }

  componentDidMount() {
    posts.get().then(postsSnapshot => {
      let posts = [];
      postsSnapshot.forEach(post => post.data().imageRef.includes('postImages/') && posts.push(Object.assign(post.data(), { id: post.id })));
      this._loadPosts(posts);
    }).catch(err => console.error('HomeScreen.componentDidMount', err))
  }

  async _loadPosts(posts) {
    for (let post of posts) {
      post.key = await storage.ref(post.imageRef).getDownloadURL();
      post.user = await users.doc(post.userId).get()
        .then(user => {
          if (user.data().avatarRef.includes('avatars/')) {
            return storage.ref(user.data().avatarRef).getDownloadURL().then(avatarUri => Object.assign({ avatarUri }, user.data()))
          } else return user.data() 
        }).catch(err => console.log('Error getting documents', err));
    }
    this.setState({ posts })
  }
}
/* state = { isReady: false }

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
} */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  }
})
