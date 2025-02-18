const mongoose = require('mongoose');

// Define the schema for system controls
const SystemControlSchema = new mongoose.Schema({
  waterMotor: Boolean,
  phMotorUp: Boolean,
  phMotorDown: Boolean,
  growLight: Boolean,
  fertilizer: Boolean,
  solenoid: Boolean,
});

// Export the model
module.exports = mongoose.model('SystemControl', SystemControlSchema);
