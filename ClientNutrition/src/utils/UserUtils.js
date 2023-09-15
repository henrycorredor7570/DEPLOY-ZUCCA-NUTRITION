import dayjs from 'dayjs';
import jwtDecode from "jwt-decode";

function handleUserLogin(token) {
    const decoded = jwtDecode(token);
    
    const user = {
        id: decoded.id,
        name: decoded.name,
        lastName: decoded.lastName,
        image: decoded.image,
        role: decoded.role ? decoded.role : "nutritionist"
    }

  window.localStorage.setItem("token", token);
  window.localStorage.setItem("user", JSON.stringify(user));
  window.localStorage.setItem("id", user.id);
}

function handleUserLogout() {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("user");
}

function isUserLoggedIn() {
  return window.localStorage.getItem("token") != null;
}

function getLoggedInUser() {
  return JSON.parse(window.localStorage.getItem("user"));
}

function getUserRole() {
  const user = getLoggedInUser();
  if (user == null) {
    return "unauthenticated";
  }
  return user.role;
}

function coordinator() {
  const role = getUserRole();

  if (role == "admin") {
    return {
      profile: "/adminprofile",
    };
  } else if (role == "user") {
    return {
      profile: "/appointments",
    };
  } else {
    // we asume nutritionist
    return {
      profile: "/nutritionistprofile",
    };
  }
}

function filterUniqueUserIds(data) {
  // Crea un objeto para almacenar los UserIds únicos como claves
  const uniqueUserIds = {};

  // Recorre el arreglo de objetos
  for (const item of data) {
    // Agrega el UserId como clave en el objeto (los objetos no permiten claves duplicadas)
    uniqueUserIds[item.UserId] = true;
  }

  // Convierte las claves únicas en un arreglo
  const uniqueUserIdsArray = Object.keys(uniqueUserIds).map(Number);

  return uniqueUserIdsArray;
}


function filterEventsAfterCurrentDateTime(events) {
  // Obtén la fecha y hora actual con dayjs
  const currentDate = dayjs();

  // Filtra los eventos que suceden después de la fecha y hora actual
  const filteredEvents = events.filter((event) => {
    const eventDateTime = dayjs(`${event.date} ${event.hour}:00`, { format: 'YYYY-MM-DD HH:mm:ss' });

    return eventDateTime.isAfter(currentDate);
  });

  return filteredEvents;
}

const filterAppointmentsBeforeCurrentTime = (appointment) => {
  const currentDateTime = dayjs(); // Get the current date and tim
  const filteredAppointments = appointment.filter((appointment) => {
    // Parse the appointment date and time using dayjs
    const appointmentDateTime = dayjs(
      `${appointment.date} ${appointment.hour}:00`
      );
      // Compare the appointment date and time to the current date and time
    return appointmentDateTime.isSameOrBefore(currentDateTime);
  });
  
  return filteredAppointments;
};

export {
  handleUserLogin,
  handleUserLogout,
  isUserLoggedIn,
  getLoggedInUser,
  coordinator,
  filterUniqueUserIds,
  filterEventsAfterCurrentDateTime,
  filterAppointmentsBeforeCurrentTime
};
