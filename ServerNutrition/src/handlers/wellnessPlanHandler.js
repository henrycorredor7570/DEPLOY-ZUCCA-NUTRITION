/* handler usuarios */

const {
  getOneWP,
  createWP,
  updateWP,
  destroyWP,
} = require("../controllers/wellnessPlanController");

const createWellnessPlan = async (req, res) => {
  try {
    const response = await createWP();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOneWellnessPlan = async (req, res) => {
  try {
    const response = await getOneWP();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateWellnessPlan = async (req, res) => {
  try {
    const response = await updateWP();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const destroyWellnessPlan = async (req, res) => {
  try {
    const response = await destroyWP();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  getOneWellnessPlan,
  createWellnessPlan,
  updateWellnessPlan,
  destroyWellnessPlan,
};
