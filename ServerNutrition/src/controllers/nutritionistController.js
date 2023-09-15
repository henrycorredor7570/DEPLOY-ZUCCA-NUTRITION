const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Nutritionist, Event } = require("../db");
require("dotenv").config();
const { decodeTokenOauth } = require("../Utils/google");
const { getDoc } = require("../Utils/nutritionistUtils");

/* const getDoctor = async (day, hour) => {
  try {
    const nutritionistsfromDB = await Nutritionist.findAll({
      include: [
        {
          model: Event,
        },
      ],
    });

    if (nutritionistsfromDB.length === 0) {
      throw new Error("No users found in the database!");
    }
    const nutritionistsFiltered = nutritionistsfromDB.filter((N) => {
      const nutritionist = N.toJSON();
      const { diasDeTrabajo } = nutritionist;
      const daysN = Object.keys(diasDeTrabajo);
      const hoursN = Object.values(diasDeTrabajo);

      for (let i = 0; i < daysN.length; i++) {
        if (Number(daysN[i]) === day) {
          for (const range in hoursN[i]) {
            if (hoursN[i][range][0] === hour) {
              return nutritionist;
            }
          }
        }
      }
    });
    if (nutritionistsFiltered.length === 0) {
      throw new Error("No nutritionist for that date!");
    }
    const Doc = getDoc(nutritionistsFiltered);

    return Doc;
  } catch (error) {
    throw new Error(`Error x: ${error.message}`);
  }
}; */

const getDoctor = async () => {
  try {
    const nutritionistsfromDB = await Nutritionist.findAll({
      include: [
        {
          model: Event,
        },
      ],
    });

    if (nutritionistsfromDB.length === 0) {
      throw new Error("No users found in the database!");
    }

    // Calcula la cantidad de eventos para cada nutricionista
    const nutritionistsWithEventCount = nutritionistsfromDB.map((N) => {
      const nutritionist = N.toJSON();
      const eventCount = nutritionist.Events.length;
      return { nutritionist, eventCount };
    });

    // Ordena la lista de nutricionistas por la cantidad de eventos en orden ascendente
    nutritionistsWithEventCount.sort((a, b) => a.eventCount - b.eventCount);

    // Encuentra al nutricionista con la menor cantidad de eventos
    const nutritionistWithFewestEvents = nutritionistsWithEventCount[0].nutritionist;

    return nutritionistWithFewestEvents;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

const createN = async (nutritionist, password) => {
  try {
    // Code to fetch a nutritionist
    const passwordHashed = await bcrypt.hash(password, 8);

    const [existingNutritionist, wasCreated] = await Nutritionist.findOrCreate({
      where: { email: nutritionist.email },
      defaults: { ...nutritionist, password: passwordHashed },
    });
    if (!wasCreated) throw new Error("nutritionist already exists!");

    const token = jwt.sign(
      existingNutritionist.dataValues,
      process.env.SECRET_KEY
    );

    return token;
  } catch (error) {
    throw new Error(`Error fetching nutritionist: ${error.message}`);
  }
};

// Mostrar usuario
const getOneN = async (data) => {
  try {
    let nutritionist;
    if (typeof data === "number") {
      nutritionist = await Nutritionist.findOne({
        where: { id: data },
        include: [
          {
            model: Event,
          },
        ],
      });
    } else {
      nutritionist = await Nutritionist.findOne({
        where: { name: data },
        include: [
          {
            model: Event,
          },
        ],
      });
    }

    if (!nutritionist) {
      throw new Error(`Nutritionist not found`);
    }
    return nutritionist;
  } catch (error) {
    throw new Error(`Error fetching nutritionist: ${error.message}`);
  }
};

// Actualizar un usuario
const updateN = async (id, data) => {
  try {
    const allowedFields = ["name", "lastName", "email", "password"];

    // Verificar que solo los campos permitidos sean modificados
    const updateFields = Object.keys(data);
    const invalidFields = updateFields.filter(
      (field) => !allowedFields.includes(field)
    );
    if (invalidFields.length > 0) {
      const invalidFieldNames = invalidFields.join(", ");
      throw new Error(`Fields not permitted for update: ${invalidFieldNames}`);
    }

    await Nutritionist.update(data, {
      where: { id },
    });
    const updatedNutritionist = await Nutritionist.findByPk(id);

    return updatedNutritionist;
  } catch (error) {
    throw new Error(`Error updating nutritionist: ${error.message}`);
  }
};

// Obtener todos los usuarios
const getAllN = async (isActive) => {
  try {
    let nutritionistsfromDB;

    switch (isActive) {
      case "true":
        nutritionistsfromDB = await Nutritionist.findAll({
          where: { isActive: true },
        });
        break;

      case "false":
        nutritionistsfromDB = await Nutritionist.findAll({
          where: { isActive: false },
        });
        break;

      default:
        nutritionistsfromDB = await Nutritionist.findAll();
        break;
    }

    if (nutritionistsfromDB.length === 0) {
      throw new Error("No users found in the database!");
    }

    return nutritionistsfromDB;
  } catch (error) {
    throw new Error(`Error fetching all nutritionists: ${error.message}`);
  }
};

// Eliminar usuario
const softdeleteN = async (id) => {
  try {
    if (!id) {
      throw new Error(`No ID provided for deletion.`);
    }

    const deletedNutritionist = await Nutritionist.findOne({
      where: { id, isActive: true },
    });

    if (!deletedNutritionist) {
      throw new Error(`Nutritionist with ID ${id} not found.`);
    }

    await Nutritionist.update({ isActive: false }, { where: { id } });

    return deletedNutritionist;
  } catch (error) {
    throw new Error(`Error deleting nutritionist: ${error.message}`);
  }
};

const restoreN = async (id) => {
  console.log(id);
  try {
    if (!id) {
      throw new Error(`No ID provided for restoration!`);
    }
    await Nutritionist.update({ isActive: true }, { where: { id } });

    const restoredNutritionist = await Nutritionist.findByPk(id);

    return restoredNutritionist;
  } catch (error) {
    throw new Error(`Error updating nutritionist: ${error.message}`);
  }
};



//checkCredentials
const checkCredentials = async ({ email, password }) => {
  try {
    const nutritionist = await Nutritionist.findOne({ where: { email } });
    if (!nutritionist) throw new Error("Wrong email or password");

    const isValidPassword = await bcrypt.compare(
      password,
      nutritionist.password
    );
    if (!isValidPassword || nutritionist.email !== email)
      throw new Error("Wrong email or password");

    const token = jwt.sign(nutritionist.dataValues, process.env.SECRET_KEY);
    console.log(nutritionist.dataValues);
    return token;
  } catch (error) {
    throw new Error(`Error checking credentials: ${error.message}`);
  }
};

//checkCredentialsOauth
const checkCredentialsOauth = async (data) => {
  try {
    const { email } = await decodeTokenOauth(data);
    const nutritionist = await Nutritionist.findOne({ where: { email } });
    if (!nutritionist)
      throw new Error("¡A gmail account is not regiter for this user!");
    if (nutritionist.isActive === false) throw new Error("This user is banned");

    const token = jwt.sign({ id: nutritionist.id }, process.env.SECRET_KEY);
    return token;
  } catch (error) {
    throw new Error(`Error checking credentials(Oauth 2.0): ${error.message}`);
  }
};
//registerOauthUser
const registerOauthUser = async (data) => {
  try {
    const { email, name, picture, sub } = await decodeTokenOauth(data);
    const [{ id }, created] = await Nutritionist.findOrCreate({
      where: { email },
      defaults: {
        name,
        email,
        image: picture,
        googleId: sub,
      },
    });
    if (!created) throw new Error("User already exists");

    //await newUserEmail(name, email);

    const token = jwt.sign({ id }, process.env.SECRET_KEY);
    return token;
  } catch (error) {
    throw new Error(`Error during OAuth user registration: ${error.message}`);
  }
};


//updateBusyD
const addScheduleS = async (id, dateDetail) => {
  try {
    const { date, hour } = dateDetail;
    const nutritionist = await Nutritionist.findByPk(id);
    if (!nutritionist) {
      throw new Error(`nutritionist not found!`);
    }
    const busyDays = nutritionist.dataValues.busyDays;
    if (!busyDays[date]) {
      busyDays[date] = [];
    }
    busyDays[date].push([hour, hour + 1]);
    await Nutritionist.update(
      { busyDays },
      {
        where: { id },
      }
    );

    const updatedNutritionist = await Nutritionist.findByPk(id);

    return updatedNutritionist;
  } catch (error) {
    throw new Error(`Error updating nutritionist: ${error.message}`);
  }
};

const deleteScheduleS = async (id, dateDetail) => {
  try {
    const { date, hour } = dateDetail;
    const nutritionist = await Nutritionist.findByPk(id);
    if (!nutritionist) {
      throw new Error(`Nutritionist not found!`);
    }

    const busyDays = nutritionist.dataValues.busyDays;

    // Verifica si el día existe en el calendario
    if (busyDays[date]) {
      // Filtra los horarios que no coinciden con el horario que se desea eliminar
      busyDays[date] = busyDays[date].filter(([start, end]) => {
        return start !== hour || end !== hour + 1;
      });

      // Elimina el día si ya no tiene horarios ocupados
      if (busyDays[date].length === 0) {
        delete busyDays[date];
      }

      // Actualiza el registro del nutricionista con el calendario modificado
      await Nutritionist.update(
        { busyDays },
        {
          where: { id },
        }
      );

      const updatedNutritionist = await Nutritionist.findByPk(id);

      return updatedNutritionist;
    } else {
      throw new Error(`No busy schedule for the specified date: ${date}`);
    }
  } catch (error) {
    throw new Error(`Error updating nutritionist: ${error.message}`);
  }
};

module.exports = {
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
};
