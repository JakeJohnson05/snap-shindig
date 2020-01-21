import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';

import COLORS from 'snapshindig/assets/colors';

export class PostComponent extends React.Component {
  render = () => <View style={styles.post}>
    {!this.props.hideHeader && this.props.data.user && <PostHeader {...this.props} user={this.props.data.user} />}

    <Image source={this.props.data.imageSource} style={styles.image} />

    <View>
      <Text>{this.props.data.caption}</Text>
    </View>

  </View>;
}

export class PostHeader extends React.Component {
  render = () => <View style={styles.header}>
    <View style={styles.userImage}>
      <TouchableOpacity onPress={() => this.props.navigation.push('ProfileScreen', { userId: this.props.user.id, user: this.props.user })}>
        <Image source={this.props.user.avatarSource} style={styles.userImage} />
      </TouchableOpacity>
    </View>
    <View style={styles.username}>
      <TouchableOpacity onPress={() => this.props.navigation.push('ProfileScreen', { userId: this.props.user.id, user: this.props.user })}>
        <Text>{this.props.user.username}</Text>
      </TouchableOpacity>
    </View>
  </View>;
}

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
    backgroundColor: COLORS.grayVeryLight,
    width: Dimensions.get('window').width,
    height: undefined,
    aspectRatio: 1
  }
})
