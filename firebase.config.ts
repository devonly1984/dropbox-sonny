import {getApp,getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyALuu-sX1mxtSvAZvyQf5HmTfE78D69Jos",
    authDomain: "dropbox-clone-yt.firebaseapp.com",
    projectId: "dropbox-clone-yt",
    storageBucket: "dropbox-clone-yt.appspot.com",
    messagingSenderId: "972163312948",
    appId: "1:972163312948:web:84034b701a28b91d2f4961"
  };

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  export {db,storage};