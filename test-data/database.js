const Users = JSON.stringify([
	{
		avatarRef: 'snapshindig/test-data/images/profile-1.jpg',
		avatarUri: require('snapshindig/test-data/images/profile-1.jpg'),
		bio: 'Hey There!',
		createdAt: 1576206540,
		id: '1',
		name: 'Jake Johnson',
		username: 'jakejohnson',
	}, {
		avatarRef: 'snapshindig/test-data/images/profile-2.jpg',
		avatarUri: require('snapshindig/test-data/images/profile-2.jpg'),
		bio: 'I\'m A God',
		createdAt: 1576208540,
		id: '2',
		name: 'Tod Johnson',
		username: 'mynameistod',
	}, {
		avatarRef: 'snapshindig/test-data/images/profile-3.jpg',
		avatarUri: require('snapshindig/test-data/images/profile-3.jpg'),
		bio: 'I am a kewl person',
		createdAt: 1576212540,
		id: '3',
		name: 'Ryland Freeman',
		username: 'ryryfree23',
	}
]);

const Posts = JSON.stringify([
	{
		id: '1',
		createdAt: 1576212540,
		key: require('snapshindig/test-data/images/post-1.jpg'),
		imageRef: 'postImages/',
		caption: 'Me and my friends went on a trip',
		comments: [],
		likes: [],
		userId: '3'
	}, {
		id: '2',
		createdAt: 1576212640,
		key: require('snapshindig/test-data/images/post-2.jpg'),
		imageRef: 'postImages/',
		caption: 'So lucky to have @jakejohnson as my Pref date!!!',
		comments: [],
		likes: [],
		userId: '3'
	}, {
		id: '3',
		createdAt: 1576212040,
		key: require('snapshindig/test-data/images/post-4.jpg'),
		imageRef: 'postImages/',
		caption: 'My First Post Ever!',
		comments: [],
		likes: [],
		userId: '1'
	}, {
		id: '4',
		createdAt: 1576212050,
		key: require('snapshindig/test-data/images/post-3.jpg'),
		imageRef: 'postImages/',
		caption: 'Haha me and my brother are so funny',
		comments: [],
		likes: [],
		userId: '1'
	}, {
		id: '5',
		createdAt: 1576212060,
		key: require('snapshindig/test-data/images/post-5.jpg'),
		imageRef: 'postImages/',
		caption: 'She went gay',
		comments: [],
		likes: [],
		userId: '1'
	}, {
		id: '6',
		createdAt: 1576212070,
		key: require('snapshindig/test-data/images/post-6.jpg'),
		imageRef: 'postImages/',
		caption: 'Idk why this is like the only photo with good quality but i kinda like her so it\'s chill.',
		comments: [],
		likes: [],
		userId: '1'
	}, {
		id: '7',
		createdAt: 1576212045,
		key: require('snapshindig/test-data/images/post-7.jpg'),
		imageRef: 'postImages/',
		caption: 'I Used to play football with the Lone Peak Knights!! How amazing is that!?',
		comments: [],
		likes: [],
		userId: '2'
	}
]);

class Collection {
	/** @type {string} */
	_data;

	constructor(data) {
		this._data = typeof data == 'string' ? data : JSON.stringify(data);
	}

	/** @return {Promise<{[key: string]: any}[]>} */
	get data() { return Promise.resolve(this.dataNP) }
	/** @return {{[key: string]: any}[]} */
	get dataNP() { return JSON.parse(this._data) }

	get = async (startIndex = 0, step = undefined) => this.data.then(data => data.slice(startIndex, step ? startIndex + step : undefined).map(unit => ({ exists: !!unit, data: () => unit }))).catch(_ => []);
	doc = reference => ({ get: async () => this.data.then(data => data.find(({ id }) => reference == id)).then(data => ({ exists: !!data, data: () => data })).catch(_ => ({ exists: false })) });
	/**
	 * @param {string} fieldPath
	 * @param {'=='|'==='|'!='|'!=='|'>'|'>='|'<'|'<='} operator
	 * @param {any} value
	 */
	where = (fieldPath, operator = undefined, value = undefined) => new Collection(this.dataNP.filter(dataPoint => {
		let refValue = dataPoint[fieldPath];
		switch (operator) {
			case '==': return refValue == value;
			case '===': return refValue === value;
			case '!=': return refValue != value;
			case '!==': return refValue !== value;
			case '>': return refValue > value;
			case '>=': return refValue >= value;
			case '<': return refValue < value;
			case '<=': return refValue <= value;
			default: return false;
		}
	}));
	/**
	 * @param {string} fieldPath
	 * @param {'desc'|'asc'} direction
	 */
	orderBy = (fieldPath, direction) =>  new Collection(direction == 'asc' ? this.dataNP.sort((a, b) => a[fieldPath] - b[fieldPath]) : this.dataNP.sort((a, b) => b[fieldPath] - a[fieldPath]));
}

const postsCollection = new Collection(Posts);
const usersCollection = new Collection(Users);
const storage = ({ ref: _relUri => ({ getDownloadURL: async () => 'snapshindig/assets/defaultProfile.png' }) });
const uid = 1;
const auth = {
	createUserWithEmailAndPassword: (_email, _password) => Promise.reject('TEST_DATA: doesnt work'),
	signInWithEmailAndPassword: (_email, _password) => Promise.reject('TEST_DATA: doesnt work'),
	onAuthStateChanged: (nextOrObserver, opt_error, opt_completed) => {
		Promise.resolve().then(() => {
			if (typeof nextOrObserver == 'function') nextOrObserver(({ uid }));
			else if (typeof nextOrObserver['next'] == 'function') nextOrObserver['next'](({ uid }));
		});
		return () => { return; }
	}
};

export default {
	postsCollection,
	usersCollection,
	auth,
	storage
}
