import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class FirebaseService {
    constructor(config) {
        app.initializeApp(config);
        // *** Helpers *** //
        this.fsFieldValue = app.firestore.FieldValue; // Firestore FieldValue

        this.auth = app.auth();
        this.db = app.database();
        this.fs = app.firestore();
        this.storage = app.storage();

        // *** Social Sign in Method Provider *** //
        this.googleProvider = new app.auth.GoogleAuthProvider();
        this.facebookProvider = new app.auth.FacebookAuthProvider();
    }

    // *** Users *** //
    usersRef = () => this.fs.collection('users');
    userRef = id => this.fs.doc(`users/${id}`);
}

const firebaseService = new FirebaseService(config);
export default firebaseService;