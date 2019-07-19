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
        // this.app = app;
        this.auth = app.auth();
        this.db = app.database();
        this.fs = app.firestore();
        this.storage = app.storage();

        // *** Social Sign in Method Provider *** //
        this.googleProvider = new app.auth.GoogleAuthProvider();
        this.facebookProvider = new app.auth.FacebookAuthProvider();
    }

    // *** Users *** //
    userRef = id => this.fs.doc(`users/${id}`);
    usersRef = () => this.fs.collection('users');
    organizationRef = id => this.fs.doc(`organizations/${id}`);
    organizationsRef = () => this.fs.collection('organizations');
    ORGANIZATION_TYPES = {
        School: 'School',
        Company: 'Company',
    }
    // *** Address *** //
    countryRef = id => this.fs.doc(`countries/${id}`);
    countriesRef = () => this.fs.collection('countries');
    cityRef = id => this.fs.doc(`cities/${id}`);
    citiesRef = () => this.fs.collection('cities');
    districtRef = id => this.fs.doc(`districts/${id}`);
    districtsRef = () => this.fs.collection(`districts`);
    wardRef = id => this.fs.doc(`wards/${id}`);
    wardsRef = () => this.fs.collection('wards');
    // *** Devices *** //
    deviceRef = id => this.fs.doc(`devices/${id}`);
    devicesRef = () => this.fs.collection('devices');
    // *** Messages *** //
    messageRef = id => this.fs.doc(`messages/${id}`);
    messagesRef = () => this.fs.collection('messages');
    // *** Assets *** //
    ASSETS_TYPES = {
        Image: 'Image',
        File: 'File',
        Audio: 'Audio',
        Video: 'Video',
        PDF: 'PDF',
        Docs: 'Docs',
        Excel: 'Excel',
        Powerpoint: 'Powerpoint',
    }
    assetRef = id => this.fs.doc(`assets/${id}`);
    assetsRef = () => this.fs.collection('assets');
    // *** Contents *** //
    CONTENT_TYPES = {
        Wiki: 'Wiki',
        Quizz: 'Quizz',
        // *** Questions *** //
        MultiChoiceQuestion: 'MultichoiceQuestion',
        SingleChoiceQuestion: 'SingleChoiceQuestion',
        TrueFalseQuestion: 'TrueFalseQuestion',
        FillInBlankQuestion: 'FillInBlankQuestion',
        MatchQuestion: 'MatchQuestion',
        OrderingQuestion: 'OrderingQuestion',
    }
    contentRef = id => this.fs.doc(`contents/${id}`);
    contentsRef = () => this.fs.collection('contents');
    wikiRef = id => this.fs.doc(`wikis/${id}`);
    wikisRef = () => this.fs.collection('wikis');
    quizzRef = id => this.fs.doc(`quizzs/${id}`);
    quizzsRef = () => this.fs.collection('quizzs');
    questionRef = id => this.fs.doc(`questions/${id}`);
    questionsRef = () => this.fs.collection('questions');
    // *** Activities *** //
    ACTIVITY_TYPES = {
        ReadWiki: 'ReadWiki',
        DoQuizz: 'DoQuizz',
    }
    activityRef = id => this.fs.doc(`activities/${id}`);
    activitiesRef = () => this.fs.collection('activities');
    activityAttemptRef = id => this.fs.doc(`activityAttempts/${id}`);
    activityAttemptsRef = () => this.fs.collection('activityAttempts');
    // *** Categories && Tags *** //
    categoryRef = id => this.fs.doc(`categories/${id}`);
    categoriesRef = () => this.fs.collection('categories');
    tagRef = id => this.fs.doc(`tags/${id}`);
    tagsRef = () => this.fs.collection('tags');
    // *** Storage *** //
    uploadImage = async uri => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();

            const ref = this.storage.ref('avatar').child(uuidv4());
            const task = ref.put(blob);

            task.on('state_changed', snapshot => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case app.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case app.storage.TaskState.RUNNING:
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