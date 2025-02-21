const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json'); // Path to your Firebase service account key

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hydroponic-system-fa9cc-default-rtdb.asia-southeast1.firebasedatabase.app" // Replace with your database URL
});

// Create Express app
const app = express();
app.use(bodyParser.json());

// Control routes
const controlRouter = require('./routes/control');
app.use('/api/control', controlRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
