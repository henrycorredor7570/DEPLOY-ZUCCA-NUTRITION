/* handler usuarios */

const {
  createUserDB,
  deleteUser,
  updateUser,
  getAllUsers,
  authentication,
  getUser,
  authenticationOauth,
  newUserOauth,
  activateUser,
  getUserDetail
} = require("../controllers/usersController");

// ruta crear usuario y generar token.
const signup = async (req, res) => {
  const {
    name,
    lastName,
    email,
    birthDate,
    password,
    phone,
    address,
    gender,
    role,
   
  } = req.body;
  try {
    const token = await createUserDB({
      name,
      lastName,
      email,
      birthDate,
      password,
      phone,
      address,
      gender,
      role,
      
    });
    const user = {
      name,
      lastName,
      email,
      birthDate,
      phone,
      address,
      gender,
      role,
    };
    res
      .status(200)
      .header("authorization", `Bearer ${token}`)
      .json({ token, user });
  } catch (error) {
    res.status(400).json({ error: "Error creating user" });
  }
};

//ruta crear OAuth2
const signupOauth = async (req, res) => {
  const { tokenId } = req.body; //encoded token
  try {
    const response = await newUserOauth(tokenId);
      return res.status(200).json({ message: response });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//login OAuth2

const loginOauth = async (req, res) => {
  const { tokenId } = req.body; //Encoded token
  try {
    const tokenResponse = await authenticationOauth(tokenId);
    res.status(200).json({ token: tokenResponse });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// ruta crear y verificar el token ingresado

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("login token:", req.body);
  try {
    const token = await authentication({ email, password });
    res
      .status(200)
      .header("authorization", `Bearer ${token}`)
      .json({ message: "Login successful", token });
  } catch (error) {
    res.status(404).json({ error: "Invalid email or password" });
  }
};

// traer el usuario creado o autorizado

const user = async (req, res) => {
  try {
    const userData = await getUser(req.user);
    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json({ error: "Unauthorized" });
  }
};
//user id
const userId = async (req, res) => {
  const { id } = req.params;
  try {
    const userDetail = await getUserDetail(id);
    if (!userDetail) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(userDetail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//ruta para actualizar un usuario:

const updateUserHanlder = async (req, res) => {
  try {
    const status = await updateUser(req.user, req.body);
    res.status(200).json(status);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//ruta para obtener todos los usuarios:

const getAllUsersHandler = async (req, res) => {
  try {
    const response = await getAllUsers();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const activate = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await activateUser(id);
    res.status(200).json(status);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteUser(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signup,
  updateUserHanlder,
  getAllUsersHandler,
  login,
  user,
  signupOauth,
  loginOauth,
  activate,
  destroy,
  userId
};
