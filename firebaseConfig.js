import Firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
// Import desired Firebase products
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import ENV_VARS from './env';

// Initialize the Firebase app if none other exist
if (!Firebase.apps.length) Firebase.initializeApp(ENV_VARS.firebaseOptions);

const firestore = Firebase.firestore();

export const posts = firestore.collection('posts').orderBy('createdAt', 'desc');
export const users = firestore.collection('users');
export const auth = Firebase.auth();
export const storage = Firebase.storage();
export const createTimestamp = () => Firebase.firestore.Timestamp.fromDate(new Date());


/** The Firebase app instance with custom configurations */
class FirebaseApp {
	/** @type {BehaviorSubject<User[]>} Contains all the users already requested */
	usersBS;

	constructor() {
		this.usersBS = new BehaviorSubject([]);
	}

	/**
	 * Get any post by its uid
	 * @param {string}  postId
	 * @return {Promise<Post>}
	 */
	getPost = async postId => {
		if (!postId) return null;

		let postSnapShot = await firestore.collection('posts').doc(postId).get();
		if (!postSnapShot.exists) return null;
		let post = new Post(Object.assign(post.data(), { id: post.id }));

		// post.key = await storage.ref(post.imageRef).getDownloadURL();
		// post.user = await this.getUserData(post.userId);

		return post;
	}

	/**
	 * Get the database collection data about a user by the uid
	 * @param {string}  userId
	 * @return {Promise<User>} User matching id else null
	 */
	getUserData = async userId => {
		if (!userId) return null;
		// Check if the user has already been requested
		let user = this.usersBS.value.find(({ id }) => id === userId);
		// If no previous User found. Make request to database
		if (!user) {
			user = await users.doc(userId).get();
			if (!user.exists) return null;
			user = Object.assign({ id: user.id }, user.data());

			// Add the users avatar uri if avatar path exists
			if (user.avatarRef && user.avatarRef.includes('avatars/')) user.avatarUri = await storage.ref(user.avatarRef).getDownloadURL()/* .then(avatarUri => Object.assign({ avatarUri }, user)) */;

			user = new User(user);
			// Push the new user to the local behavior subject
			this.usersBS.value.push(user);
		}
		// return new User(user.bio, user.name, user.username, user.avatarUri, user.avatarRef);
		return user;
	}

	/** 
	 * Get the posts for a specific user
	 * @param {User}  user
	 * @return {Promise<Post[]>}
	 */
	getUsersPosts = async user => !(user || user.id) ? [] : firestore.collection('posts').where('userId', '==', user.id).get().then(postSnaps => {
		let posts = [];
		postSnaps.forEach(post => post.exists && post.data().imageRef.includes('postImages/') && posts.push(new Post(Object.assign({ user, id: post.id }, post.data()))));
		return posts;
	}).catch(_ => []);
}

export const appDatabase = new FirebaseApp();

/** Represents the general Model defaults */
class Model {
	/** @type {string} */
	id;
	/** @type {Timestamp} */
	createdAt;

	/** @param {Model}	[opts]*/
	constructor({ id = undefined, createdAt = undefined } = {}) {
		this.id = id;
		this.createdAt = new Timestamp(createdAt);
	}

	/**
	 * Sort function for sorting Models by their createdAt date
	 * @param {Model} @param {Model}
	 */
	static sortByDate = ({ createdAt: { seconds: aSecs } }, { createdAt: { seconds: bSecs } }) => bSecs - aSecs;
}

/** The User object stored in the database */
export class User extends Model {
	/** @type {string} */
	bio;
	/** @type {string} */
	name;
	/** @type {string} */
	username;
	/** @type {string} */
	avatarUri;
	/** @type {string} */
	avatarRef;

	/** @param {User}	[opts] */
	constructor(opts = {}) {
		super(opts);
		this.bio = opts.bio;
		this.name = opts.name;
		this.username = opts.username;
		this.avatarUri = opts.avatarUri;
		this.avatarRef = opts.avatarRef;
	}

	/** Get the value in the correct format for the <*Image source=*{**Insert here**} /> */
	get avatarSource() { return this.avatarUri ? ({ uri: this.avatarUri }) : require('snapshindig/assets/defaultProfile.png') }
}

/** The Post object stored in the database */
export class Post extends Model {
	/** @type {string} */
	key;
	/** @type {string} */
	imageRef;
	/** @type {string} */
	caption;
	/** @type {{text: string; userId: string}[]} */
	comments;
	/** @type {string[]} */
	likes;
	/** @type {User['id']} */
	userId;
	/** @type {User} */
	user;

	/** @param {Post}	[opts] */
	constructor(opts = {}) {
		super(opts);
		this.key = opts.key;
		this.imageRef = opts.imageRef;
		this.caption = opts.caption;
		this.comments = opts.comments;
		this.likes = opts.likes;
		this.userId = opts.userId;
		this.user = (opts.user instanceof User && opts.user.id) ? opts.user : undefined;
	}

	async keyDownload(force = false) {
		if (force || !this.key) this.key = await storage.ref(this.imageRef).getDownloadURL();
		return this.key;
	}

	async userDownload(force = false) {
		if (force || !this.user) this.user = await appDatabase.getUserData(this.userId);
		return this.user;
	}
	// let [key, user] = await Promise.all([storage.ref(post.imageRef).getDownloadURL(), appDatabase.getUserData(post.userId)]);

	/** Gets the image for the 'add post' picture */
	static get addPostImage() { return require('snapshindig/assets/add.png') }
}

/** The 'createdAt' object in Models */
class Timestamp {
	/** @type {number} */
	seconds;
	/**
	 * @type {number}
	 * @warn Use Timestamp.seconds instead @important Use Timestamp.seconds instead
	 */
	nanoseconds = NaN;

	/** @param {number | {seconds: number}} seconds */
	constructor(seconds = NaN) {
		if (typeof seconds == "number") this.seconds = seconds;
		else if (seconds && typeof seconds == "object" && typeof seconds.seconds == "number") this.seconds = seconds.seconds;
		else this.seconds = NaN;
	}
}
