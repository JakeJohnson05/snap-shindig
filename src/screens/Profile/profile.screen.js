import React from 'react';
import { Text, View, Button, StyleSheet, FlatList, Image, Dimensions, ImageBackground } from 'react-native';

import { Loading } from 'snapshindig/src/components/loading';
import COLORS from 'snapshindig/assets/colors';

import { auth, appDatabase, Post, User } from '../../../firebaseConfig';

export class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('username', 'Profile')
  });
  /** @type {[key: string]: ReactNativeFiberHostComponent} */
  inputRefs = {}
  /** @type {{ user: User; posts: Post[]; }} */
  state = { user: undefined, posts: undefined }
  /** @type {Function[]} The unsubscribe functions */
  unmountSubscriptions = [];

  render = () => !this.state.user ? <Loading /> : (
    <View style={{ flex: 1 }}>
      <Image source={this.state.user.avatarSource} style={styles.coverImage} blurRadius={40} />
      <FlatList
        data={this.state.posts}
        numColumns={3}
        ListHeaderComponent={<UserProfile user={this.state.user} />}
        renderItem={({ item: { key: uri } }) => <MiniPost imageUri={{ uri }} />}
        bouncesZoom={true}
      />
    </View>
  );

  componentDidMount = () => this.unmountSubscriptions = [
    auth.onAuthStateChanged(userSnap => !userSnap ? this.setState({ user: new User(), posts: [] }) : appDatabase.getUserData(userSnap.uid).then(user => {
      if (!user) throw this.setState({ user: new User(), posts: [] });
      this.props.navigation.setParams({ username: user.username.toUpperCase() });
      this.setState({ user, posts: [{ key: 'addNew' }] });
      // return appDatabase.getUsersPosts(user);
    })/* .then(posts => posts.sort(Post.sortByDate)).then(posts => this._loadPosts(posts))
      .catch(err => console.error('ProfileScreen.componentDidMount: ' + JSON.stringify(err))) */)
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

const MiniPost = ({ imageUri }) => imageUri.uri == 'addNew' ? <Image source={Post.addPostImage} style={styles.miniImage} /> : <Image source={imageUri} style={styles.miniImage} />;

/** @param {{user: User}} */
const UserProfile = ({ user }) => (
  <View>
    <View style={styles.whiteBgOverlay}>
      <View style={{ width: '100%', height: 1, backgroundColor: COLORS.grayLight, shadowColor: '#000', shadowOpacity: 1, shadowRadius: 3, shadowOffset: { height: 1, width: 0 } }}></View>
    </View>

    <View style={styles.profileContainer}>

      <View style={styles.profileTopRow}>
        <Image source={User.defaultProfile} style={styles.userImage} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>

    </View>
  </View>
);

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
    // borderColor: '#FFF',
    borderColor: COLORS.grayVeryLight,
    alignSelf: "center"
    // marginLeft: 4,
    // marginRight: 8

  },
  name: {
    marginHorizontal: 30,
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
