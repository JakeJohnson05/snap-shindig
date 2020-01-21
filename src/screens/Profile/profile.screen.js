import React from 'react';
import { Text, View, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';

import { auth, appDatabase, Post } from '../../../firebaseConfig';
import COLORS from 'snapshindig/assets/colors';
import { Loading } from 'snapshindig/src/components/components';

export class PersonalProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({ title: navigation.getParam('user', { username: 'Profile' }).username.toUpperCase() });
  state = { user: undefined, posts: undefined, isReady: false }
  /** @type {Function[]} The unsubscribe functions */
  unmountSubscriptions = [];

  render = () => !this.state.isReady ? <Loading /> : <ProfileLayout {...this.props} user={this.state.user} posts={this.state.posts} />;

  componentDidMount = () => this.unmountSubscriptions = [
    auth.onAuthStateChanged(userSnap => !userSnap ? this.setState({ isReady: true }) : appDatabase.getUserData(userSnap.uid).then(user => {
      if (!user) throw this.setState({ isReady: true });
      this.props.navigation.setParams({ user });
      this.setState({ user, posts: [Post.generateAddPost()], isReady: true });
      return appDatabase.getUsersPosts(user);
    }).then(posts => posts.sort(Post.sortByDate)).then(posts => this._loadPosts(posts))
      .catch(err => err instanceof Error && console.error('PersonalProfileScreen.componentDidMount: ' + JSON.stringify(err))))
  ];

  /** @param {Post[]} posts */
  async _loadPosts(posts) {
    for (let post of posts) {
      await post.keyDownload();
      this.setState(prevState => ({ posts: [...prevState.posts, post] }));
    }
  }

  componentWillUnmount = () => this.unmountSubscriptions.forEach(unsubscribe => unsubscribe());
}

export class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({ title: navigation.getParam('user', { username: 'Profile' }).username.toUpperCase() });
  state = { user: undefined, posts: undefined, isReady: false }

  render = () => !this.state.isReady ? <Loading /> : <ProfileLayout {...this.props} user={this.state.user} posts={this.state.posts} />;

  componentDidMount() {
    Promise.resolve(this.props.navigation.getParam('user', undefined))
      .then(user => user.id ? user : appDatabase.getUserData(this.props.navigation.getParam('userId', undefined)))
      .then(user => {
        if (!user) throw this.setState({ isReady: true });
        this.props.navigation.setParams({ user });
        this.setState({ user, posts: [], isReady: true });
        return appDatabase.getUsersPosts(user);
      }).then(posts => posts.sort(Post.sortByDate)).then(posts => this._loadPosts(posts))
      .catch(err => err instanceof Error && console.error('ProfileScreen.componentDidMount: ' + JSON.stringify(err)))
  }

  /** @param {Post[]} posts */
  async _loadPosts(posts) {
    for (let post of posts) {
      await post.keyDownload();
      this.setState(prevState => ({ posts: [...prevState.posts, post] }));
    }
  }
}

class ProfileLayout extends React.Component {
  render = () => <View style={{ flex: 1 }}>
    <Image source={this.props.user.avatarSource} style={styles.coverImage} blurRadius={20} />
    <FlatList
      data={this.props.posts}
      numColumns={3}
      ListHeaderComponent={<UserProfile {...this.props} />}
      renderItem={({ item }) => <MiniPost {...this.props} post={item} />}
      bouncesZoom={true}
    />
  </View>
}

class UserProfile extends React.Component {
  render = () => <View>
    <View style={styles.whiteBgOverlay}>
      {/* <View style={{ width: '100%', height: 1, backgroundColor: COLORS.grayLight, shadowColor: '#000', shadowOpacity: 1, shadowRadius: 3, shadowOffset: { height: 1, width: 0 } }}></View> */}
    </View>
    <View style={styles.profileContainer}>
      <View style={styles.profileTopRow}>
        <Image source={this.props.user.avatarSource} style={styles.userImage} />
        <Text style={styles.name}>{this.props.user.name}</Text>
        <Text style={styles.bio}>{this.props.user.bio}</Text>
      </View>
    </View>
  </View>;
}

class MiniPost extends React.Component {
  render = () => {
    const { post, navigation } = this.props;
    if (post.id === 'addPostImagePlaceholder') return <Image source={post.imageSource} style={styles.miniImage} />;
    return (
      <TouchableOpacity onPress={() => navigation.push('SinglePostScreen', { post })}>
        <Image source={post.imageSource} style={styles.miniImage} />
      </TouchableOpacity>
    );
  }
}

const superNumber = 2.5;

const styles = StyleSheet.create({
  profileContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray
  },
  coverImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0
  },
  whiteBgOverlay: {
    height: Dimensions.get('window').height * 2,
    width: Dimensions.get('window').width,
    backgroundColor: '#FFF',
    position: 'absolute',
    top: Dimensions.get('window').width / (superNumber)
  },
  profileTopRow: {
    marginTop: Dimensions.get('window').width / (superNumber * 4)
  },
  userImage: {
    height: Dimensions.get('window').width / superNumber,
    width: Dimensions.get('window').width / superNumber,
    borderRadius: Dimensions.get('window').width / (superNumber * 2),
    borderWidth: 2,
    borderColor: COLORS.grayVeryLight,
    alignSelf: 'center'
  },
  name: {
    marginHorizontal: 20,
    fontSize: 20
  },
  bio: {
    marginVertical: 8,
    marginHorizontal: 20,
    fontSize: 14
  },
  postsContainer: {
  },
  miniImage: {
    backgroundColor: COLORS.grayVeryLight,
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
  }
})
