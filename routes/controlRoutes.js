const express = require('express');
const router = express.Router();
const SystemControl = require('../models/SystemControl');  // Import the model for system control

// Fetch the current system state from the database
router.get('/state', async (req, res) => {
  try {
    let systemState = await SystemControl.findOne();

    if (!systemState) {
      // If no system state exists, create a default one
      const defaultState = new SystemControl({
        waterMotor: false,
        phMotorUp: false,
        phMotorDown: false,
        growLight: false,
        fertilizer: false,
        solenoid: false,
      });
      systemState = await defaultState.save();
    }

    res.json(systemState);  // Return the existing or newly created system state
  } catch (error) {
    console.error('Error fetching state:', error);
    res.status(500).json({ success: false, message: 'Error fetching state' });
  }
});

// Toggle waterMotor (water pump)
router.post('/waterMotor', async (req, res) => {
  try {
    let currentState = await SystemControl.findOne();
    if (!currentState) {
      const defaultState = new SystemControl({
        waterMotor: false,
        phMotorUp: false,
        phMotorDown: false,
        growLight: false,
        fertilizer: false,
        solenoid: false,
      });
      currentState = await defaultState.save();
    }

    // Toggle the waterMotor state
    currentState.waterMotor = !currentState.waterMotor;

    // Save the updated state to the database
    await currentState.save();

    res.json({ success: true, waterMotor: currentState.waterMotor });
  } catch (error) {
    console.error('Error toggling water motor:', error);
    res.status(500).json({ success: false, message: 'Error toggling water motor' });
  }
});

// Toggle pH Up motor
router.post('/phMotorUp', async (req, res) => {
  try {
    let currentState = await SystemControl.findOne();
    if (!currentState) {
      const defaultState = new SystemControl({
        waterMotor: false,
        phMotorUp: false,
        phMotorDown: false,
        growLight: false,
        fertilizer: false,
        solenoid: false,
      });
      currentState = await defaultState.save();
    }

    // Toggle the pHUpMotor state
    currentState.phMotorUp = !currentState.phMotorUp;

    // Save the updated state to the database
    await currentState.save();

    res.json({ success: true, phMotorUp: currentState.phMotorUp });
  } catch (error) {
    console.error('Error toggling pH Up motor:', error);
    res.status(500).json({ success: false, message: 'Error toggling pH Up motor' });
  }
});

// Toggle pH Down motor
router.post('/phMotorDown', async (req, res) => {
  try {
    let currentState = await SystemControl.findOne();

    if (!currentState) {
      console.log("No system state found, creating default...");
      currentState = await SystemControl.create({
        waterMotor: false,
        phMotorUp: false,
        phMotorDown: false,
        growLight: false,
        fertilizer: false,
        solenoid: false,
      });
    }

    console.log("Current pH Down Motor State BEFORE update:", currentState.phMotorDown);

    // Toggle the pHDownMotor state
    currentState.phMotorDown = !currentState.phMotorDown;

    // Save the updated state to the database
    await currentState.save();

    console.log("Updated pH Down Motor State AFTER update:", currentState.phMotorDown);

    res.json({ success: true, phMotorDown: currentState.phMotorDown });
  } catch (error) {
    console.error('Error toggling pH Down motor:', error);
    res.status(500).json({ success: false, message: 'Error toggling pH Down motor' });
  }
});


// Toggle grow light
router.post('/growLight', async (req, res) => {
  try {
    let currentState = await SystemControl.findOne();
    if (!currentState) {
      const defaultState = new SystemControl({
        waterMotor: false,
        phMotorUp: false,
        phMotorDown: false,
        growLight: false,
        fertilizer: false,
        solenoid: false,
      });
      currentState = await defaultState.save();
    }

    

    // Toggle the growLight state
    currentState.growLight = !currentState.growLight;

    // Save the updated state to the database
    await currentState.save();

    res.json({ success: true, growLight: currentState.growLight });
  } catch (error) {
    console.error('Error toggling grow light:', error);
    res.status(500).json({ success: false, message: 'Error toggling grow light' });
  }
});

// Toggle fertilizer
router.post('/fertilizer', async (req, res) => {
  try {
    let currentState = await SystemControl.findOne();
    if (!currentState) {
      const defaultState = new SystemControl({
        waterMotor: false,
        phMotorUp: false,
        phMotorDown: false,
        growLight: false,
        fertilizer: false,
        solenoid: false,
      });
      currentState = await defaultState.save();
    }

    // Toggle the fertilizer state
    currentState.fertilizer = !currentState.fertilizer;

    // Save the updated state to the database
    await currentState.save();

    res.json({ success: true, fertilizer: currentState.fertilizer });
  } catch (error) {
    console.error('Error toggling fertilizer:', error);
    res.status(500).json({ success: false, message: 'Error toggling fertilizer' });
  }
});

// Toggle solenoid
router.post('/solenoid', async (req, res) => {
  try {
    let currentState = await SystemControl.findOne();
    if (!currentState) {
      const defaultState = new SystemControl({
        waterMotor: false,
        phMotorUp: false,
        phMotorDown: false,
        growLight: false,
        fertilizer: false,
        solenoid: false,
      });
      currentState = await defaultState.save();
    }

    // Toggle the solenoid state
    currentState.solenoid = !currentState.solenoid;

    // Save the updated state to the database
    await currentState.save();

    res.json({ success: true, solenoid: currentState.solenoid });
  } catch (error) {
    console.error('Error toggling solenoid:', error);
    res.status(500).json({ success: false, message: 'Error toggling solenoid' });
  }
});

module.exports = router;
