import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDZ7pYaAmDG30yEei1uypyJaeRpYwvlOqE',
  authDomain: "ilfordfilms.firebaseapp.com",
  databaseURL: "https://ilfordfilms.firebaseio.com",
  projectId: "ilfordfilms",
  storageBucket: "ilfordfilms.appspot.com",
};

const app = firebase.initializeApp(config)
const googleProvider = new firebase.auth.GoogleAuthProvider()

export { app, googleProvider }
