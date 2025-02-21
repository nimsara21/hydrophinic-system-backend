const express = require("express");
const router = express.Router();
const SystemControl = require("../models/SystemControl");

// Simulated sensor data (replace with actual sensor input)
let currentPhValue = 8; // Example: Actual pH value from the sensor
let currentFertilizerPPM = 150; // Example: Actual Fertilizer PPM from the sensor

// Function to automate system based on preset conditions
async function automateSystem() {
  try {
    let currentState = await SystemControl.findOne();

    if (!currentState) {
      // If no current state is found, create a new default state
      currentState = new SystemControl({
        waterMotor: false,
        phMotorUp: false,
        phMotorDown: false,
        growLight: false,
        fertilizer: false,
        solenoid: false,
        phLowerLimit: 7, // Preset lower pH limit
        phUpperLimit: 9, // Preset upper pH limit
        fertilizerThreshold: 200, // Preset fertilizer threshold (PPM)
        growLightTimer: 5, // Preset grow light timer (in hours)
      });
      await currentState.save(); // Save default state to the database
    }

    // AUTOMATE pH control
    if (currentPhValue > currentState.phUpperLimit) {
      currentState.phMotorDown = true;
      console.log("pH is high, turning on pH Down motor.");
    } else if (currentPhValue < currentState.phLowerLimit) {
      currentState.phMotorUp = true;
      console.log("pH is low, turning on pH Up motor.");
    } else {
      currentState.phMotorDown = false;
      currentState.phMotorUp = false;
      console.log("pH is within range.");
    }

    // AUTOMATE Fertilizer control
    if (currentFertilizerPPM < currentState.fertilizerThreshold) {
      currentState.fertilizer = true;
      console.log("Fertilizer level is low, turning on fertilizer.");
    } else {
      currentState.fertilizer = false;
      console.log("Fertilizer level is sufficient.");
    }

    // AUTOMATE Grow Light control (turn on for 5 hours)
    if (!currentState.growLight) {
      currentState.growLight = true;
      console.log("Turning on grow light for 5 hours.");
      setTimeout(() => {
        currentState.growLight = false; 
        console.log("Grow light turned off after 5 hours.");
        currentState.save(); 
      }, currentState.growLightTimer * 3600 * 1000); // 5 hours in milliseconds
    }

    await currentState.save();
  } catch (error) {
    console.error("Error automating system:", error);
  }
}

// Set interval to run the automation periodically (e.g., every minute)
setInterval(automateSystem, 60000); // Run every 1 minute

module.exports = router;
