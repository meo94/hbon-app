import firebaseService from './firebase';
import { doGetUserById } from './user';

export const doSignInWithEmailAndPassword = (email, password) => firebaseService.auth.signInWithEmailAndPassword(email, password);
export const doSignInWithGoogle = () => firebaseService.auth.signInWithPopup(firebaseService.googleProvider);
export const doSignInWithFacebook = () => firebaseService.auth.signInWithPopup(firebaseService.facebookProvider);

export const doSignOut = () => firebaseService.auth.signOut();

export const doPasswordReset = email => firebaseService.auth.sendPasswordResetEmail(email);
export const doPasswordUpdate = password => firebaseService.auth.currentUser.updatePassword(password);
export const doSendEmailVerification = () => firebaseService.auth.currentUser.sendEmailVerification({
    url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
});

export const onAuthUserListener = (next, fallback) =>
    firebaseService.auth.onAuthStateChanged(authUser => {
        if (authUser) {
            // console.log(authUser);
            doGetUserById(authUser.uid)
                .then(dbUser => {
                    authUser = {
                        ...dbUser,
                        uid: authUser.uid,
                        email: authUser.email,
                        emailVerified: authUser.emailVerified,
                        providerData: authUser.providerData,
                    };
                    next(authUser);
                })
                .catch(error => console.log(error));
        } else {
            fallback();
        }
    });