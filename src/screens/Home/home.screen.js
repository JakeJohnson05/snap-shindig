import React from 'react';
import { View, SectionList } from 'react-native';

import { appDatabase, Post } from '../../../firebaseConfig';
import { PostComponent, PostHeader } from 'snapshindig/src/components/post';
import { Loading } from 'snapshindig/src/components/loading';

export class HomeScreen extends React.Component {
  static navigationOptions = { title: 'Snap Shindig', headerBackTitle: 'Home', headerTruncatedBackTitle: 'Home' }
  state = { posts: [], loading: true }

  render = () => this.state.loading ? <Loading /> : (
    <View style={{ flex: 1 }}>
      <SectionList
        sections={this.state.posts}
        renderSectionHeader={renderSectionHeaderFunction}
        renderItem={renderItemFunction}
      />
    </View>
  );

  componentDidMount = () => appDatabase.getAllPosts().get().then(postsSnaps => {
    console.log('HomeScreen.componentDidMount', postsSnaps)
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

const renderSectionHeaderFunction = ({ section: { user } }) => <PostHeader user={user} />;
const renderItemFunction = ({ item }) => <PostComponent data={item} hideHeader={true} />;
