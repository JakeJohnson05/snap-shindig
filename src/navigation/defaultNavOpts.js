import COLORS from 'snapshindig/assets/colors';

/**
 * The default navigation options for all the stack navigators
 *
 * Reduces duplicate code and makes changes much quicker
 */
export default {
	defaultNavigationOptions: {
		headerStyle: { backgroundColor: COLORS.blue, height: 40 },
		headerTitleStyle: { color: '#FFF', fontSize: 20 },
		headerTintColor: '#FFF',
	},
	headerBackTitleVisible: false
}
