import React from 'react';
import { FlatList, View } from 'react-native';

import { posts, storage, getUserData } from '../../../firebaseConfig';
import Post from 'snapshindig/src/components/post';

export class HomeScreen extends React.Component {
  static navigationOptions = { title: 'Snap Shindig', headerBackTitle: 'Home', headerTruncatedBackTitle: 'Home' }

  state = { posts: [] }

  render = () => (
    <View style={{ flex: 1 }}>
      <FlatList data={this.state.posts} renderItem={({ item }) => <Post postData={item} />} />
    </View>
  );


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
      post.user = await getUserData(post.userId);
    }
    this.setState({ posts })
  }
}
