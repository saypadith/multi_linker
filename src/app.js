const express = require('express');
const bodyParser = require('body-parser');
const redirectRoutes = require('./routes/redirectRoutes');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

// Use redirect routes
app.use('/', redirectRoutes);

// Start the server and log status
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Catch any unhandled errors
app.on('error', (err) => {
  console.error('Server error:', err);
});
