import Firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
// Import desired Firebase products
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import ENV_VARS from './env';

// Initialize the Firebase app if none other exist
if (!Firebase.apps.length) Firebase.initializeApp(ENV_VARS.firebaseOptions);

export const posts = Firebase.firestore().collection('posts').orderBy('createdAt', 'desc');
export const users = Firebase.firestore().collection('users');
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
   * Get the database collection data about a user by the uid
   * @param {string} id
   * @return {Promise<User>} User matching id else null
   */
  getUserData = async id => {
    if (!id) return new Promise(resolve => resolve(null));

    /** @type {User} The User data matching the requested id */
    // Check if the user has already been requested
    let user = this.usersBS.value.find(user => user.id === id);

    // If no previous User found. Make request to database
    if (!user) {
      console.log('Making request for user');
      user = await users.doc(id).get().then(user => Object.assign({ id: user.id }, user.data()));
      if (!user) return new Promise(resolve => resolve(null));

      // Add the users avatar uri if avatar path exists
      if (user.avatarRef && user.avatarRef.includes('avatars/')) {
        user = await storage.ref(user.avatarRef).getDownloadURL().then(avatarUri => Object.assign({ avatarUri }, user));
      }
      // Push the new user to the local behavior subject
      this.usersBS.value.push(user);
    }

    return user;
  }
}

export const Database = new FirebaseApp();


/** Represents the general Model defaults */
class Model {
  /** @type {string} */
  id;
  /** @type {Timestamp} */
  createdAt;
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
  /** @type {User} */
  user;
}

/** The 'createdAt' object in Models */
class Timestamp {
  /** @type {number} */
  seconds;
  /**
   * @type {number}
   * @deprecated Use Timestamp.seconds
   */
  nanoseconds;
}
