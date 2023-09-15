const nodemailer = require("nodemailer");

//FUNCIÓN PARA ENVIAR NOTIFICACIONES VIA EMAIL:
const sendEmailNotification = async (email, name) => {
  //CODIGO PARA ENVIAR NOTIFICACION VIA EMAIL AL USUARIO QUE HA SIDO CREADO:
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "pfhenry4@gmail.com", //email del servidor o dominio desde donde se envia el mensaje
      pass: "tndvsvitmutasmpv", // contraseña que se genero en gestionar contraseñas para aplicaciones en google
    },
  });

  await transporter.sendMail({
    from: '"ZUCCA NUTRITION" <pfhenry4@gmail.com>', // aqui va el correo desde donde se envia el mensaje y titulo de origen
    to: email, // el email que recibe el mensaje
    subject: "¡Usuario creado exitosamente!", // titulo del mensaje
    // text: "hola esto es una prueba", se puede enviar el mensaje como texto plano o como html
    html: `
          <b>Su usuario ${name} ha sido creado exitosamente en la base de datos Zucca Nutrition</b>
      `, // se le puede poner cualquier link que se desee en el cuerpo del mensaje para que cuando ingrese lo redirija puede ser a la plataforma
  });
};

//FUNCIÓN PARA ENVIAR NOTIFICACION Al PACIENTE VIA EMAIL CUANDO SE CREE UNA CITA:
const sendEmailCreateEvent = async (userEmail, event, nutritionistName) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "pfhenry4@gmail.com",
      pass: "tndvsvitmutasmpv",
    },
  });

  await transporter.sendMail({
    from: '"ZUCCA NUTRITION" <pfhenry4@gmail.com>',
    to: userEmail,
    subject: "¡Cita creada exitosamente!",
    html: `
          <p>Nutricionista: ${nutritionistName}</p>
          <p>Fecha: ${event.dataValues.date}</p>
          <p>Hora: ${event.dataValues.hour}hs.</p>
          <p>Motivo: ${event.dataValues.purpose}</p>
      `,
  });
};

//FUNCIÓN PARA ENVIAR NOTIFICACION Al NUTRICIONISTA VIA EMAIL CUANDO SE CREE UNA CITA:
const sendEmailNutritionist = async (nutritionistEmail, event, userName) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "pfhenry4@gmail.com",
      pass: "tndvsvitmutasmpv",
    },
  });

  await transporter.sendMail({
    from: '"ZUCCA NUTRITION" <pfhenry4@gmail.com>',
    to: nutritionistEmail,
    subject: "¡Tienes asignada una nueva cita!",
    html: `
          <p>Paciente: ${userName}</p>
          <p>Fecha: ${event.dataValues.date}</p>
          <p>Hora: ${event.dataValues.hour}hs.</p>
          <p>Motivo: ${event.dataValues.purpose}</p>
      `,
  });
};

//FUNCIÓN PARA ENVIAR RECORDATORIOS VIA EMAIL:
const sendAdvanceNotifications = async (email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "pfhenry4@gmail.com",
      pass: "tndvsvitmutasmpv",
    },
  });

  // Fecha y hora de la cita médica (esto es solo un ejemplo, asegúrate de tener la lógica adecuada para obtener esta fecha)
  const citaMedicaDate = new Date("2023-08-26T15:30:00"); // AQUI VA LA HORA Y FECHA REAL DE LA CITA MEDICA

  //Calcular la hora 72 horas antes de la cita:
  console.log(citaMedicaDate.getTime());
  const notificationDate = new Date(
    citaMedicaDate.getTime() - 0.25 * 60 * 60 * 1000
  ); // se resta 72 horas en milisegundos

  // Calcular el tiempo hasta la notificacion:
  const tiempoHastaNotificacion = notificationDate.getTime() - Date.now();

  setTimeout(async () => {
    await transporter.sendMail({
      from: '"ZUCCA NUTRITION" <pfhenry4@gmail.com>', // aqui va el correo desde donde se envia el mensaje y titulo de origen
      to: email, // el email que recibe el mensaje
      subject: "Recordatorio de cita médica", // titulo del mensaje
      text: "Este es un recordatorio de tu cita médica en 72 horas.", // se puyede enviar un tipo text o html
    });
  }, tiempoHastaNotificacion);
};
module.exports = {
  sendEmailNotification,
  sendAdvanceNotifications,
  sendEmailCreateEvent,
  sendEmailNutritionist,
};
