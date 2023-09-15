const uuid = require("uuid");
const axios = require("axios");
require("dotenv").config();

const { YOUR_CLIENT_ID, YOUR_CLIENT_SECRET, YOUR_REDIRECT_URL, YOUR_API_KEY } =
  process.env;

/* const oauth2Client = new google.auth.OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  YOUR_REDIRECT_URL
);

const scopes = [
  "https://www.googleapis.com/auth/calendar",
  "openid",
  "profile",
  "email",
]; */

/* const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
}); */

// Guardar en una cookie el token de acceso

// Obtener todos los eventos de usuario registrado

const getAllEvents = async (req, res) => {
  try {
    const { calendarId } = req.query;
		const date = new Date().toISOString(); 
    const { data } = await axios.get(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?orderBy=startTime&singleEvents=true&timeMin=${date}&key=${YOUR_API_KEY}`
    );
    return res.status(200).json({ response: data.items });
  } catch (error) {
    console.error("Error in getAllEvents:", error);
    return res.status(400).json({ error: error.message });
  }
};

// Ruta para Crear calendario

const createCalendar = async (req, res) => {
  try {
				const { accessToken, name, description, timeZone } = req.body;
				const calendarData = {
					summary: name,
					description: description,
					timeZone: timeZone, 
			};
				const { data } = await axios.post(`https://www.googleapis.com/calendar/v3/calendars?key=${YOUR_API_KEY}`, calendarData, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
						'Content-Type': 'application/json',
						Accept: 'application/json',
					}
				});
				return res.status(200).json({ response: data });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Crea un evento en el calendario especificado

const saveEvent = async (req, res) => {
  try {
		const { accessToken, name, description, dateTimeStart, dateTimeEnd, timeZone, attendees, calendarId } = req.body;
    const requestId = uuid.v4();
    const event = {
      summary: name,
      description: description,
      start: {
        dateTime: dateTimeStart,
        timeZone: timeZone,
      },
      end: {
        dateTime: dateTimeEnd,
        timeZone: timeZone,
      },
      attendees: [
        ...attendees
      ],
      conferenceData: {
        createRequest: {
          requestId: requestId,
        },
      },
      sendNotifications: true, // Agrega esta línea para enviar notificaciones por correo
    };
		const { data } = await axios.post(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?conferenceDataVersion=1&key=${YOUR_API_KEY}`, event, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
    return res.status(200).json({ message: "La cita se creo correctamente", data })
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getAllEvents,
  saveEvent,
  createCalendar,
};
