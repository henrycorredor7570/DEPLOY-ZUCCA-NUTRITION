/* handler usuarios */

const {
  softdeleteN,
  updateN,
  getAllN,
  restoreN,
  getOneN,
  createN,
  checkCredentials,
  checkCredentialsOauth,
  registerOauthUser,
  getDoctor,
  addScheduleS,
  deleteScheduleS,
} = require("../controllers/nutritionistController");
const { getHorarioTrabajoCombinado } = require("../Utils/nutritionistUtils.js");

const getMyDoctor = async (req, res) => {
  try {
    const response = await getDoctor();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const gethorariosCombinados = async (req, res) => {
  try {
    const response = await getHorarioTrabajoCombinado();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createNutritionist = async (req, res) => {
  try {
    const { password, ...nutritionistProperties } = req.body;
    const token = await createN(nutritionistProperties, password);
    res
      .status(200)
      .header("authorization", `Bearer ${token}`)
      .json({ token, ...nutritionistProperties, isActive: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//ruta para obtener todos los usuarios:
const getAllNutritionists = async (req, res) => {
  const { isActive } = req.query;
  try {
    const response = await getAllN(isActive);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//ruta para obtener usuarios por query:
const getOneNutritionist = async (req, res) => {
  try {
    const { id, name } = req.query;
    if (!id && !name) {
      return res.status(400).json({
        error: "Please provide either 'id' or 'name' query parameter",
      });
    }

    const response = await getOneN(Number(id) || name);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateNutritionist = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await updateN(id, req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteNutritionist = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await softdeleteN(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const restoreNutritionist = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await restoreN(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


/*loginNutritionist;
loginOauthNutritionist;
signupOauthNutritionist; */
const loginNutritionist = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("login token:", req.body);
    const token = await checkCredentials({ email, password });
    res
      .status(200)
      .header("authorization", `Bearer ${token}`)
      .json({ message: "Login successful", token });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const loginOauthNutritionist = async (req, res) => {
  const { tokenId } = req.body; //Encoded token
  try {
    const tokenResponse = await checkCredentialsOauth(tokenId);
    res.status(200).json({ token: `Bearer ${tokenResponse}` });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const signupOauthNutritionist = async (req, res) => {
  const { tokenId } = req.body; //encoded token
  try {
    const token = await registerOauthUser(tokenId);
    res.status(200).json({ token: `Bearer ${token}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSchedule = async (req, res) => {
  try {
    const horarioCombinado = await getHorarioTrabajoCombinado();
    res.status(200).json(horarioCombinado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//updateBusyDays
const addScheduleSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSchedule = await addScheduleS(id, req.body);
    res.status(200).json(updatedSchedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//deleteScheduleSlot
const deleteScheduleSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSchedule = await deleteScheduleS(id, req.body);
    res.status(200).json(updatedSchedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createNutritionist,
  getAllNutritionists,
  getOneNutritionist,
  updateNutritionist,
  deleteNutritionist,
  restoreNutritionist,
  loginNutritionist,
  loginOauthNutritionist,
  signupOauthNutritionist,
  getSchedule,
  getMyDoctor,
  gethorariosCombinados,
  addScheduleSlot,
  deleteScheduleSlot,
};
