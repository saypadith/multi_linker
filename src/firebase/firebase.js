// src/firebase/firebase.js

const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc, setDoc, collection, FieldValue } = require('firebase/firestore');
const config = require('../config');

// Initialize Firebase
const firebaseConfig = {
  apiKey: config.FIREBASE_API_KEY,
  authDomain: config.FIREBASE_AUTH_DOMAIN,
  projectId: config.FIREBASE_PROJECT_ID,
  storageBucket: config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
  appId: config.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db, doc, getDoc, setDoc, collection, FieldValue };
