import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

export class PostComponent extends React.Component {
  render = () => (
    <View style={styles.post}>
      {!this.props.hideHeader && this.props.data.user && <PostHeader user={this.props.data.user} />}

      <Image source={{ uri: this.props.data.key }} style={styles.image} />
      <View>
        <Text>{this.props.data.caption}</Text>
      </View>

    </View>
  );
}

export const PostHeader = ({ user }) => (
  <View style={styles.header}>
    <View style={styles.userImage}>
      <Image source={user.avatarSource} style={styles.userImage} />
    </View>
    <View style={styles.username}>
      <Text>{user.username}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  post: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    marginBottom: 12
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    backgroundColor: '#FFF'
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
