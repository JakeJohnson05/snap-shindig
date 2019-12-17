import React from 'react';
import { Text, View, Button, StyleSheet, FlatList, Image, Dimensions } from 'react-native';

import { auth, posts, getUserData, storage } from '../../../firebaseConfig';

export class ProfileScreen extends React.Component {
  static navigationOptions = { title: 'Profile' }

  state = { user: undefined, posts: undefined }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Profile!</Text>
        <Button title="Log Out" onPress={_ => auth.signOut()} />
        <View style={styles.postsContainer}>
          <FlatList numColumns={3} data={this.state.posts} renderItem={({ item }) => <MiniPost imageUri={item.key} />} />
        </View>
      </View>
    );
  }

  componentDidMount() {
    return auth.onAuthStateChanged(userSnap => {
      if (!userSnap) return this.setState({ user: undefined, posts: [] });
      else return getUserData(userSnap.uid).then(user => {
        if (!user) return this.setState({ user: undefined, posts: [] });
        this.setState({ user, posts: [] });
        return user.id;
      }).then(userId => posts.where('userId', '==', userId).get())
        .then(posts => Promise.all(posts.docs.map(async nextPost => {
          if (nextPost.exists && nextPost.data().imageRef.includes('postImages/')) {
            let post = nextPost.data();
            post.key = await storage.ref(post.imageRef).getDownloadURL();
            return post;
          }
        }))).then(posts => {
          posts.unshift({ key: 'addNew' });
          this.setState({ posts })
        })
    })
  }
}

class MiniPost extends React.Component {
  render() {
    if (this.props.imageUri === 'addNew') return (
      <Image source={require('../../../assets/add.png')} style={styles.image} />
    )
    return (
      <Image source={{ uri: this.props.imageUri }} style={styles.image} />
    )
  }
}

const styles = StyleSheet.create({
  postsContainer: {
  },
  image: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
  }
})
