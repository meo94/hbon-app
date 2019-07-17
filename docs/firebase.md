### Firebase

#### Realtime Database

```javascript
// 
const db = firebase.database();

// *** GLOBAL STATE for multiple connected devices *** //
const devices = () => db.ref('devices');
const device = uid => db.ref(`devices/${uid}`);

// on: read data tai mot path va theo doi su thay doi.
// once: read data tai mot path va bo qua viec theo doi su thay doi
devices().on('value', snapshot => {
   const dataObject = snapshot.val();
   
   if(dataObject) {
       const dataList = Object.keys(dataObject).map(key => ({
           ...dataObject[key],
           uid: key,
       }))
   }
});
// chu y phai ngat theo doi su thay doi khi khong can thiet
devices().off();

// set: ghi de du lieu tai mot path bat ky. se ghi de ca cac child nodes
device(deviceId).set({
    deviceName: '',
});

// push: them du lieu vao 1 path bat ky
devices().push({
    deviceName: '',
})

// update: thay doi du lieu tai 1 path. Co the thuc hien update o nhieu path khac nhau cung 1 luc
function writeNewPost(uid, username, picture, title, body) {
    var postData = {
        author: username,
        uid: uid,
        body: body,
        title: title,
        starCount: 0,
        authorPic: picture
    };

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('posts').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    return firebase.database().ref().update(updates);
}

// theo doi su thay doi cua cac node con
var commentsRef = firebase.database().ref('post-comments/' + postId);
commentsRef.on('child_added', function(data) {
  addCommentElement(postElement, data.key, data.val().text, data.val().author);
}); // comment nao moi dc them

commentsRef.on('child_changed', function(data) {
  setCommentValues(postElement, data.key, data.val().text, data.val().author);
}); // comment moi thay doi du lieu

commentsRef.on('child_removed', function(data) {
  deleteComment(postElement, data.key);
}); // comment vua xoa
```

```javascript
// xac dinh trang thai ket noi cua client
const connectedRef = db.ref('.info/connected');
connectedRef.on('value', snap => {
   if (snap.val()===true) {
       alert("connected");
   } else {
       alert("not connected");
   }
});
// luu thoi diem truy cap cuoi cung cua user nay tren thiet bi nay
const userLastOnlineRef = firebase.database().ref("users/joe/lastOnline");
userLastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
```

```javascript
// quan ly nhieu connections cua users cung luc
// since I can connect from multiple devices or browser tabs, we store each connection instance separately
// any time that connectionsRef's value is null (i.e. has no children) I am offline
var myConnectionsRef = firebase.database().ref('users/joe/connections');

// stores the timestamp of my last disconnect (the last time I was seen online)
var lastOnlineRef = firebase.database().ref('users/joe/lastOnline');

var connectedRef = firebase.database().ref('.info/connected');
connectedRef.on('value', function(snap) {
  if (snap.val() === true) {
    // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
    var con = myConnectionsRef.push();

    // When I disconnect, remove this device
    con.onDisconnect().remove();

    // Add this device to my connections list
    // this value could contain info about the device or a timestamp too
    con.set(true);

    // When I disconnect, update the last time I was seen online
    lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
  }
});
```

```javascript
// transaction
posts = {
    starCount: 300,
    stars: {
        'fasdfasdf': true,
        'sdfasfa': true,
        'dfasdf': true,
        ...
    }
}
// users co the star hoac unstar va ta can theo doi dc post co co bao nhieu stars
function toggleStar(postRef, uid) {
  postRef.transaction(function(post) {
    if (post) {
      if (post.stars && post.stars[uid]) {
        post.starCount--;
        post.stars[uid] = null;
      } else {
        post.starCount++;
        if (!post.stars) {
          post.stars = {};
        }
        post.stars[uid] = true;
      }
    }
    return post;
  });
}
```



### Firestore

```javascript
//
const fs = firebase.firestore();

// *** USERS *** //
const users = () => fs.collection('users');
const user = uid => fs.doc(`users/${uid}`);
```

```javascript
// CHAT ROOM EXAMPLE
const rooms = [ // collection
    "roomA": {
        name: "My chat room",
    	messages: [ // sub collections
    		"message1": {},
            "message2": {},
		],
    },
    "roomB": {
        
    }
]
let messageRef = db.collection('rooms').doc('roomA').collection('messages').doc('message1');
// khi xoa collection thi subcollection van chua bi xoa
```

```
function toggleStar(postRef, uid) {  postRef.transaction(function(post) {    if (post) {      if (post.stars && post.stars[uid]) {        post.starCount--;        post.stars[uid] = null;      } else {        post.starCount++;        if (!post.stars) {          post.stars = {};        }        post.stars[uid] = true;      }    }    return post;  });}
```

https://firebase.google.com/docs/firestore/manage-data/data-types

```javascript
// Data types
Reference: tro den 1 duong dan khac vi du
projects/[PROJECT_ID]/databases/[DATABASE_ID]/documents/[DOCUMENT_PATH].
Map : kieu dictionary
Text,Integer, Floating-point number,data time, boolean,
Array,
Geographical point
```

Data Model

Nested data in document

- luu thong tin cua 3 chat rooms thuong xuyen vao gan nhat trong profile cua user

Subcollections

- luu collection cua users vaf messages trong 1 chat room

Root-level collection

- luu thong tin cua nguoi dung vao 1 collection  rieng va chatroom,messages vao 1 collection rieng.

```javascript

```

