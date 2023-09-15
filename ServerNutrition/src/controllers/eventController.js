const { Event, User, Nutritionist } = require("../db");
const {
  sendEmailCreateEvent,
  sendEmailNutritionist,
  sendAdvanceNotifications,
} = require("../Utils/Notifications");

//Creación de una cita:
const createEvent = async (eventData) => {
  // date, hour, day , purpose, NutritionistId, UserId
  try {
    const { NutritionistId, UserId } = eventData;

    const user = await User.findByPk(UserId);
    const nutritionist = await Nutritionist.findByPk(NutritionistId);

    //*Verifica que el paciente y el médico existan antes de crear la cita
    if (!user || !nutritionist) {
      throw new Error("Patient or Nutritionist not found in the database!");
    }

    //*---------notificaciones
     const userEmail = user.dataValues.email;
    const userName = `${user.dataValues.name} ${user.dataValues.lastName}`;
    const nutritionistName = `${nutritionist.dataValues.name} ${nutritionist.dataValues.lastName}`;
    const nutritionistEmail = nutritionist.dataValues.email;
    //*funcion para enviar la notificación al usuario y nutricionista apenas se cree la cita:
    //eventData.hour = Number(eventData.hour.split(":")[0]);
    const event = await Event.create(eventData);

    sendEmailCreateEvent(userEmail, eventData, nutritionistName);
    sendEmailNutritionist(nutritionistEmail, eventData, userName);
    sendAdvanceNotifications(userEmail);
    //*---------fin noti

    return event;
  } catch (error) {
    throw new Error(`Error creating Event: ${error.message}`);
  }
};

//Eliminar una cita:
const deleteEvent = async (id) => {
  await Event.destroy({ where: { id: id } });
  return `Cita con id: ${id} eliminada con éxito`;
};

//Actualizar una cita:
const updateEvent = async (id, date, hour, purpose) => {
  const event = await Event.findByPk(id);
  if (!event) throw Error("Cita no encontrada");
  await event.update({ date, hour, purpose });
  return `Cita modificada con éxito`;
};

//Obtener cita por id:
const getEventById = async (id) => {
  const eventFound = await Event.findOne({ where: { id } });
  if (!eventFound) return { error: "No existe la cita asociada a ese ID" };
  return {
    id: eventFound.dataValues.id,
    fecha: eventFound.dataValues.date,
    hora: eventFound.dataValues.hour,
    motivo: eventFound.dataValues.purpose,
    IdNutricionista: eventFound.dataValues.NutritionistId,
  };
};

//obtener todas las citas:
const getAllEvents = async () => {
  const allEvents = await Event.findAll();
  if (allEvents.length === 0)
    throw Error("¡No hay citas creadas en la base de datos");
  return allEvents;
};

module.exports = {
  createEvent,
  deleteEvent,
  updateEvent,
  getEventById,
  getAllEvents,
};
