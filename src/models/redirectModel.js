// src/models/redirectModel.js

const { db, doc, getDoc, setDoc, collection } = require('../firebase/firebase');

const redirectsRef = collection(db, 'redirects'); // Firebase collection for storing redirects

// Get a redirect document by shortId
async function getRedirectByShortId(shortId) {
  // Check if shortId is valid
  if (!shortId) {
    throw new Error('shortId cannot be empty');
  }

  // Create a reference to the document using the shortId
  const redirectDocRef = doc(redirectsRef, shortId);

  // Retrieve the document from Firestore
  const redirectDoc = await getDoc(redirectDocRef);

  // Check if the document exists and return its data, else return null
  if (redirectDoc.exists()) {
    return redirectDoc.data();
  } else {
    return null;  // Return null if the document does not exist
  }
}

// Create a new redirect record in Firebase
async function createRedirect(shortId, androidURL, iosURL, desktopURL, status) {
  const createTime = new Date().toISOString();

  // Validate that shortId is not empty
  if (!shortId) {
    throw new Error('shortId cannot be empty');
  }

  try {
    // Create document reference in Firebase with the given shortId
    const docRef = doc(redirectsRef, shortId);

    await setDoc(docRef, {
      androidURL,
      iosURL,
      desktopURL,
      createTime,
      status,
    });
  } catch (error) {
    // Log and throw the error for further handling in the controller
    console.error('Error writing to Firebase:', error);
    throw new Error('Failed to create the short link in the database.');
  }
}

module.exports = { getRedirectByShortId, createRedirect };
