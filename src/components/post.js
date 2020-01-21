import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';

import COLORS from 'snapshindig/assets/colors';

export class PostComponent extends React.Component {
  render = () => {
    const { data, hideHeader } = this.props;
    return <View style={styles.post}>
      {!hideHeader && data.user && <PostHeader {...this.props} user={data.user} />}

      <Image source={data.imageSource} style={styles.image} />

      <View style={styles.bottomCtn}>
        {data.caption && <CommentComponent {...this.props} />}
      </View>

    </View>;
  }
}

export class PostHeader extends React.Component {
  render = () => (
    <View style={styles.header}>
      <View style={styles.userImage}>
        <TouchableOpacity onPress={this.routeToProfile}>
          <Image source={this.props.user.avatarSource} style={styles.userImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.username}>
        <TouchableOpacity onPress={this.routeToProfile}>
          <Text style={styles.username}>{this.props.user.username}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  routeToProfile = () => this.props.navigation.push('ProfileScreen', { userId: this.props.user.id, user: this.props.user });
}

export class CommentComponent extends React.Component {
  render() {
    const { data: { user, caption }, navigation } = this.props;
    return (
      <View>
        <Text>
          <Text style={{ fontWeight: 'bold' }} onPress={() => navigation.push('ProfileScreen', { userId: user.id, user })}>{user.username}</Text>
          {' '}
          {caption}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  post: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayVeryLight,
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
    marginRight: 12
  },
  username: {
    fontSize: 16
  },
  image: {
    backgroundColor: COLORS.grayVeryLight,
    width: Dimensions.get('window').width,
    height: undefined,
    aspectRatio: 1
  },
  bottomCtn: {
    marginTop: 4,
    marginHorizontal: 8
  }
})
