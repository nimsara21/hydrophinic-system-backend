// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const sensorRoutes = require('./routes/sensorRoutes');
const controlRoutes = require('./routes/controlRoutes');

const app = express();
const PORT = 5000;

app.use(express.json()); // Middleware to parse JSON requests
app.use(cors()); // Enable CORS (if needed)

// Register the routes
app.use('/api/control', controlRoutes); // Ensure this is correct
app.use('/api/sensors', sensorRoutes); // Assuming you have sensor routes

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1/hydroponic', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));


// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
