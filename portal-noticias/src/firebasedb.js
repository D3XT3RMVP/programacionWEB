import firebase from 'firebase';

firebase.initializeApp ({
  apiKey: "AIzaSyAoGm-TO7t0oxW051InwQs-LfeGdEKIFk0",
  authDomain: "cursopw-utm.firebaseapp.com",
  projectId: "cursopw-utm",
});

let db = firebase.firestore();

export default db;