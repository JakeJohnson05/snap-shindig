import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import COLORS from 'snapshindig/assets/colors';

export class Loading extends React.Component {
	render = () => <View style={{ justifyContent: 'center', height: '100%', padding: 10 }}>
		<ActivityIndicator size="large" color={COLORS.blue} />
	</View>

}
