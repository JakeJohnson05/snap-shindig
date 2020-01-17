import React from 'react';
import { View } from 'react-native';

import { appDatabase, Post } from '../../../firebaseConfig';

import { PostComponent } from 'snapshindig/src/components/post';

export class HomeScreen extends React.Component {
	static navigationOptions = { title: 'Snap Shindig', headerBackTitle: 'Back', headerTruncatedBackTitle: 'Back' }
	state = { post: undefined };

	render = () => (
		<View style={{ flex: 1 }}>
			<PostComponent data={this.state.post} />
		</View>
	);

	componentDidMount = () => appDatabase.getPost(this.props.navigation.getParam('postId', undefined)).then(post => this.setState({ post }));
}
