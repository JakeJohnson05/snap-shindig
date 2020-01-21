import React from 'react';
import { View, Text } from 'react-native';

import { PostComponent } from 'snapshindig/src/components/components';

export class SinglePostScreen extends React.Component {
	static navigationOptions = { title: 'Snap Shindig', headerBackTitle: 'Back', headerTruncatedBackTitle: 'Back' }
	state = { post: undefined };

	render = () => {
		const post = this.props.navigation.getParam('post', undefined);
		return post ? <PostComponent {...this.props} data={post} /> : (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text style={{ fontSize: 20 }}>Post not found.</Text>
			</View>
		);
	}
}
