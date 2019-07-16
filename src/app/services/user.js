import firebaseService from './firebase';

export const doGetUserById = id => firebaseService.userRef(id).get().then(doc => {
    if (doc.exists) return { ...doc.data(), id: doc.id };
    else throw new Error(`User with id ${id} is not found`);
});

export const doGetUserByEmail = email => firebaseService.usersRef().where('email', '==', email).get().then(snapshot => {
    const docsLength = snapshot.docs.length;
    if (docsLength === 0) throw new Error(`User with email ${email} is not found`);
    if (docsLength >= 2) throw new Error(`Have many users with the same email`);
    const doc = snapshot.docs[0];
    return { ...doc.data(), id: doc.id };
});