// src/routes/redirectRoutes.js

const express = require('express');
const { redirectUser, createShortLink } = require('../controllers/redirectController');
const router = express.Router();

// Route for redirecting based on shortId
router.get('/redirect/:shortId', redirectUser);

// Route for creating new short link
router.post('/redirect', createShortLink);

module.exports = router;
