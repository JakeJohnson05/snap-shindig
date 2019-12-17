import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

export default class Post extends Component {
  render() {
    const { key: imageUri, caption, comments, likes, user } = this.props.postData;

    if (!user) return null;
    return (
      <View style={styles.post}>
        <View style={styles.header}>
          <View style={styles.userImage}>
            <Image source={{ uri: user.avatarUri }} style={styles.userImage} />
          </View>
          <View style={styles.username}>
            <Text>{user.username}</Text>
          </View>
        </View>
        <View>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
        <View>
          <Text>{caption}</Text>
        </View>
      </View>
    );
  }
}





const styles = StyleSheet.create({
  post: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 4
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 4,
    marginRight: 8
  },
  username: {

  },
  image: {
    width: Dimensions.get('window').width,
    height: undefined,
    aspectRatio: 1
  }
})
