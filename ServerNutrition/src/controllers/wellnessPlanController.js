// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { Nutritionist } = require("../db");
// require("dotenv").config();

const getOneWP = async () => {
  try {
    return "getAllWPs";
  } catch (error) {
    throw new Error(`Error fetching all wellnessPlans: ${error.message}`);
  }
};

const createWP = async () => {
  try {
    return "createWP";
  } catch (error) {
    throw new Error(`Error fetching all wellnessPlans: ${error.message}`);
  }
};

const updateWP = async () => {
  try {
    return "updateWP";
  } catch (error) {
    throw new Error(`Error fetching all wellnessPlans: ${error.message}`);
  }
};

const destroyWP = async () => {
  try {
    return "destroyWP";
  } catch (error) {
    throw new Error(`Error fetching all wellnessPlans: ${error.message}`);
  }
};

module.exports = {
  getOneWP,
  createWP,
  updateWP,
  destroyWP,
};
