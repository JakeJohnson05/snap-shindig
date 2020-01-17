import React from 'react';
import { Text, View, Button, StyleSheet, FlatList, Image, Dimensions } from 'react-native';

import { Loading } from 'snapshindig/src/components/loading';
import COLORS from 'snapshindig/assets/colors';

import { auth, appDatabase, Post, User } from '../../../firebaseConfig';

export class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('username', 'Profile')
  });

  /** @type {{ user: User; posts: Post[]; }} */
  state = { user: undefined, posts: undefined }
  /** @type {Function[]} The function for canceling subscriptions */
  unmountSubscriptions = [];

  render = () => !this.state.user ? <Loading /> : (
    <View style={{ flex: 1 }}>
      <FlatList
        numColumns={3}
        data={this.state.posts}
        ListHeaderComponent={<UserProfile user={this.state.user} />}
        renderItem={({ item: { key: uri } }) => <MiniPost imageUri={{ uri }} />}
      />
    </View>
  );

  componentDidMount = () => this.unmountSubscriptions = [
    auth.onAuthStateChanged(userSnap => !userSnap ? this.setState({ user: new User(), posts: [] }) : appDatabase.getUserData(userSnap.uid).then(user => {
      if (!user) throw this.setState({ user: new User(), posts: [] });
      this.props.navigation.setParams({ username: user.username.toUpperCase() });
      this.setState({ user, posts: [{ key: 'addNew' }] });
      return appDatabase.getUsersPosts(user);
    }).then(posts => posts.sort(Post.sortByDate)).then(posts => this._loadPosts(posts))
      .catch(err => console.error('ProfileScreen.componentDidMount: ' + err)))
  ];

  /** @param {Post[]} posts */
  async _loadPosts(posts) {
    for (let post of posts) {
      await post.keyDownload();
      this.setState(prevState => ({
        posts: [...prevState.posts, post]
      }));
    }
  }
  componentWillUnmount = () => this.unmountSubscriptions.forEach(unsubscribe => unsubscribe());
}

const UserProfile = ({ user }) => (
  <View style={styles.profileContainer}>
    <Text>{JSON.stringify(user)}</Text>
    <Image source={user.avatarSource} style={styles.userImage} />
  </View>
);
const MiniPost = ({ imageUri }) => imageUri.uri == 'addNew' ? <Image source={Post.addPostImage} style={styles.image} /> : <Image source={imageUri} style={styles.image} />;

const styles = StyleSheet.create({
  profileContainer: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.gray
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 4,
    marginRight: 8
  },
  postsContainer: {
  },
  image: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
  }
})
