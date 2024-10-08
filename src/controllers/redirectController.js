// src/controllers/redirectController.js

const { getRedirectByShortId, createRedirect } = require('../models/redirectModel');

// Handle redirection based on platform
async function redirectUser(req, res) {
  const { shortId } = req.params;
  const userAgent = req.headers["user-agent"];

  const redirectData = await getRedirectByShortId(shortId);

  if (!redirectData || redirectData.status !== "active") {
    return res.status(404).send("This link is not available or is inactive.'");
  }

  const isAndroid = /android/i.test(userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
  const isDesktop = /windows|mac os|linux/i.test(userAgent);

  if (isAndroid) {
    return res.redirect(redirectData.androidURL);
  } else if (isIOS) {
    return res.redirect(redirectData.iosURL);
  } else if (isDesktop) {
    return res.redirect(redirectData.desktopURL);
  } else {
    return res.status(400).send("Platform not supported");
  }
}
// src/controllers/redirectController.js


// Create a new short link
async function createShortLink(req, res) {
  const { shortId, androidURL, iosURL, desktopURL, status } = req.body;

  // Check if shortId is provided in the request
  if (!shortId) {
    return res.status(400).send('shortId is required');
  }

  try {
    // Call model to store the link
    await createRedirect(shortId, androidURL, iosURL, desktopURL, status);
    res.status(201).send({ message: 'Short link created successfully' });
  } catch (error) {
    // Log the error and return 500 status with error message
    console.error('Error creating short link:', error.message);
    res.status(500).send(`Error creating short link: ${error.message}`);
  }
}

module.exports = { redirectUser, createShortLink };
