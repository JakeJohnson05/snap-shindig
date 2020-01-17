import React from 'react';
import { View, SectionList } from 'react-native';

import { posts, Post } from '../../../firebaseConfig';
import { PostComponent, PostHeader } from 'snapshindig/src/components/post';
import { Loading } from 'snapshindig/src/components/loading';

export class HomeScreen extends React.Component {
  static navigationOptions = { title: 'Snap Shindig', headerBackTitle: 'Home', headerTruncatedBackTitle: 'Home' }
  state = { posts: [], loading: true }

  render = () => this.state.loading ? <Loading /> : (
    <View style={{ flex: 1 }}>
      <SectionList
        sections={this.state.posts}
        renderSectionHeader={({ section: { user } }) => <PostHeader user={user} />}
        renderItem={({ item }) => <PostComponent data={item} hideHeader={true} />}
      />
    </View>
  );

  componentDidMount = () => posts.get().then(postsSnap => {
    let posts = [];
    postsSnap.forEach(post => post.exists && post.data().imageRef.includes('postImages/') && posts.push(new Post(Object.assign(post.data(), { id: post.id }))));
    this._loadPosts(posts);
  }).catch(err => console.error('HomeScreen.componentDidMount: ', err));

  /** @param {Post[]} posts*/
  async _loadPosts(posts) {
    for (let post of posts) {
      await Promise.all([post.keyDownload(), post.userDownload()]);

      this.setState(prevState => ({
        loading: false,
        posts: [...prevState.posts, { user: post.user, data: [post] }]
      }));
    }
  }
}
