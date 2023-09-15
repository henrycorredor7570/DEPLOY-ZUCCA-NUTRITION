const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Event } = require("../db");
const { decodeTokenOauth } = require("../Utils/google");
require("dotenv").config();
const { sendEmailNotification } = require("../Utils/Notifications");

//Crea un usuario en la DB:

const createUserDB = async ({
  name,
  lastName,
  email,
  birthDate,
  password,
  phone,
  address,
  gender,
  role,
}) => {
  const passwordHashed = await bcrypt.hash(password, 8);
  console.log(passwordHashed);

  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      name,
      lastName,
      email,
      birthDate,
      password: passwordHashed,
      phone,
      role,
      address,
      gender,
    },
  });
  if (!created) throw new Error("User already exists");
  sendEmailNotification(email, name);
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      birthDate: user.birthDate,
      phone: user.phone,
      adress: user.adress,
      gender: user.gender,
      password: user.password,
      role: user.role,
    },
    process.env.SECRET_KEY
  );
  return token;
};

// registro OAuth2

const newUserOauth = async (data) => {
  const { email, name, picture, sub } = await decodeTokenOauth(data);
  const [{ id, role }, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      name,
      email,
      image: picture,
      googleId: sub,
    },
  });
  if (!created) {
    const message = "User Already exist";
    return message;
  }
  //await newUserEmail(name, email);
  const token = jwt.sign({ id, role, name, image: picture }, process.env.SECRET_KEY);
  return token;
};

//login OAuth
const authenticationOauth = async (data) => {
  const { email } = await decodeTokenOauth(data);
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("¡A gmail account is not regiter for this user!");
  if (user.isActive === false) throw new Error("This user is banned");

  const token = jwt.sign(
    { id: user.id, role: user.role, image: user.image, name: user.name},
    process.env.SECRET_KEY
  );
  return token;
};
//compropar token para la autenticacion:

const authentication = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Wrong user or password");

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword || user.email !== email)
    throw new Error("Wrong user or password");

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      birthDate: user.birthDate,
      phone: user.phone,
      adress: user.adress,
      gender: user.gender,
      password: user.password,
      role: user.role,
    },
    process.env.SECRET_KEY
  );
  return token;
};

//mostrar usuario verificado
const getUser = async (token) => {
  const { id } = jwt.verify(token, process.env.SECRET_KEY);
  const user = await User.findOne({ where: { id } });
  return user;
};

// user id

const getUserDetail = async (id) => {
  const user = await User.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: Event,
      },
    ],
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

//Actualizar un usuario:
const updateUser = async (token, data) => {
  const allowedFields = [
    "name",
    "lastName",
    "email",
    "password",
  ];
  const updateFields = Object.keys(data);
  const invalidFields = updateFields.filter(
    (field) => !allowedFields.includes(field)
  );
  if (invalidFields.length > 0) throw new Error("Invalid Fields");

  const { id } = jwt.verify(token, process.env.SECRET_KEY);
  await User.update(data, { where: { id } });
  return {
    status: "Updated successfully",
  };
};

//Obtener todos los usuarios:
const getAllUsers = async () => {
  try {
    const usersDB = await User.findAll({ include: Event });
    if (usersDB.length === 0)
      throw Error("¡No hay usuarios en la base de datos!");
    return usersDB;
  } catch (error) {
    throw Error(`Error al obtener los usuarios: ${error.message}`);
  }
};

// delete user
const deleteUser = async ({ id }) => {
  try {
    const user = await User.findOne({ where: { id, isActive: true } });
    if (!user) {
      return {
        status: "User not found",
      };
    }
    await User.update({ isActive: false }, { where: { id } });
    return user; // Devuelve el usuario eliminado
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};
//activado user
const activateUser = async ( id ) => {
  console.log(id);//hola
  try {
    if (!id) {
      throw new Error(`No ID provided for restoration!`);
    }
    await User.update({ isActive: true }, { where: { id } });

    const restoredNutritionist = await User.findByPk(id);

    return restoredNutritionist;
  } catch (error) {
    throw new Error(`Error updating nutritionist: ${error.message}`);
  }
};



module.exports = {
  createUserDB,
  deleteUser,
  updateUser,
  getAllUsers,
  authentication,
  getUser,
  newUserOauth,
  authenticationOauth,
  activateUser,
  getUserDetail
}
