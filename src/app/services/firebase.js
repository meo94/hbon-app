import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
import uuidv4 from 'uuid/v4';

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

    uploadImage = async uri => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();

            const ref = this.storage.ref('avatar').child(uuidv4());
            const task = ref.put(blob);

            task.on('state_changed', snapshot => {
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        console.log('Upload is running');
                        break;
                }
            }, error => { // error
                throw new Error(error);
            }, () => { // handle successful uploads on complete
                task.snapshot.ref.getDownloadURL().then(downloadURL => console.log(downloadURL));
            });
        } catch (error) {
            throw new Error(error);
        };
    }
}

const firebaseService = new FirebaseService(config);
export default firebaseService;