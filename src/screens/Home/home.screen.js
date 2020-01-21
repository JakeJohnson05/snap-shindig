import React from 'react';
import { View, SectionList } from 'react-native';

import { appDatabase, Post } from '../../../firebaseConfig';
import { PostComponent, PostHeader, Loading } from 'snapshindig/src/components/components';

export class HomeScreen extends React.Component {
  static navigationOptions = { title: 'Snap Shindig' }
  state = { posts: [], loading: true }

  render = () => this.state.loading ? <Loading /> : (
    <View style={{ flex: 1 }}>
      <SectionList
        sections={this.state.posts}
        renderSectionHeader={({ section: { user } }) => <PostHeader {...this.props} user={user} />}
        renderItem={({ item }) => <PostComponent {...this.props} data={item} hideHeader={true} />}
      />
    </View>
  );

  componentDidMount = () => appDatabase.getAllPosts().get().then(postsSnaps => {
    let posts = [];
    postsSnaps.forEach(post => post.exists && post.data().imageRef.includes('postImages/') && posts.push(new Post(Object.assign({ id: post.id }, post.data()))));
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
