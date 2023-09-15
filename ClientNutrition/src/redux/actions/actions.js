import axios from "axios";
import { handleUserLogin, getLoggedInUser, handleUserLogout } from './../../utils/UserUtils'

export const GET_USERS = "GET_USERS";
export const GET_APPOINTMENTS = "GET_APPOINTMENTS";
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const GET_SCHEDULES = "GET_SCHEDULES";
export const POST_APPOINTMENT = "POST_APPOINTMENT"
export const SAVE_INFO_EVENT = 'SAVE_INFO_EVENT'
export const RETURN_INFO_EVENT = 'RETURN_INFO_EVENT'

export function getNutritionists() {
  return async function (dispatch) {
    var json = await axios.get("/");

    return dispatch({
      type: "GET_NUTRITIONISTS",
      payload: json.data,
    });
  };
}

export function getNutritionistsName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "/nutritionists?name=" + name
      );

      console.log(json.data);

      return dispatch({
        type: "GET_NUTRITIONISTS_NAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDetail(id) {
  return async (dispatch) => {
    var json = await axios.get("/nutritionists/searchBy?id=" + id);

    return dispatch({
      type: "GET_DETAIL",
      payload: json.data,
    });
  };
}

export const addUser = (dataAct) => {
  return async function (dispatch) {
    return axios.post(`/user`, dataAct).then((res) => {
      dispatch({ type: "POST_USER", payload: res.data });
    });
  };
};

export function getUsers() {
  return async function (dispatch) {
    var json = await axios.get("/users/allUsers");
    return dispatch({
      type: "GET_USERS",
      payload: json.data,
    });
  };
}

export function getUsersId(id) {
  return async function (dispatch) {
    var json = await axios.get("/users/" + id);

    dispatch({
      type: "GET_USERS_DETAIL",
      payload: json.data.Events,
    });
  };
}

export const getAppointments = (id) => {
  return async function (dispatch) {
    const response = await axios.get(
      `/users/${id}`
    );
    return dispatch({
      type: "GET_APPOINTMENTS",
      payload: response.data.Events,
    });
  };
};

export const getSchedules = () => {
  return async function (dispatch) {
    const response = await axios.get(
      "/nutritionists/horariosCombinados"
    );
    return dispatch({
      type: "GET_SCHEDULES",
      payload: response.data,
    })
  }
}

export const getNutritionistSchedule = (id) => {
  return async function (dispatch) {
    const response = await axios.get(
      `/nutritionists/searchBy?id=${id}`
    );
    return dispatch({
      type: "GET_NUTRICIONIST_SCHEDULES",
      payload: response.data.diasDeTrabajo,
    })
  }
}

export const getNutritionist = (id) => {
  return async function (dispatch) {
    const response = await axios.get(
      `/nutritionists/searchBy?id=${id}`
    );
    return dispatch({
      type: "GET_NUTRICIONIST_NAME",
      payload: response.data,
    })
  }
}

export const login = (credentials, errorHandler) => {
  return async function(dispatch) {
    try {
      const response =
      credentials.isNutritionist === true
        ? await axios.post("/nutritionists/login", credentials) //colocar ruta de logueo nutricionista.
        : await axios.post("/users/login", credentials);
  
      handleUserLogin(response.data.token)
  
      return dispatch({
        type: "LOGIN",
        payload: getLoggedInUser()
      })
    } catch(error) {
      errorHandler(error)
    }
  }
}

export const loginOauth = (userCredentials, errorHandler) => {
  return async function(dispatch) {
    try {
      const response = 
      userCredentials.isNutritionist === true
        ? await axios.post("/nutritionists/login/oauth2.0", { tokenId: userCredentials.tokenId})
        : await axios.post("/users/login/oauth2.0", { tokenId: userCredentials.tokenId});

        handleUserLogin(response.data.token)

        return dispatch({
          type: "LOGIN",
          payload: getLoggedInUser()
        })
    } catch (error) {
      errorHandler(error)
    }
  }
}

export const logout = () => {
  handleUserLogout()
  return {
    type: "LOGOUT"
  }
}

export const signup = (userInformation, errorHandler) => {
  return async function(dispatch) {
    try {
      const response = await axios.post(
        "/users/signup",
        userInformation
      );
  
      handleUserLogin(response.data.token)
  
      return dispatch({
        type: "LOGIN",
        payload: getLoggedInUser()
      })
    } catch(error) {
      errorHandler(error)
    }
  }
}
export const signupOauth2 = (userGoogleToken, errorHandler) => {
  return async function(dispatch) {
    try {
      const response = await axios.post(
        "/users/signup/oauth2.0",
        { tokenId: userGoogleToken}
      )
        
      handleUserLogin(response.data.message);

        return dispatch({
          type: "LOGIN",
          payload: getLoggedInUser()
        })
    } catch (error) {
      errorHandler(error)
    }
  }
}

export const postAppointment = (dataAppointment) => {
  return async function (dispatch) {
    return axios.post(`/events`, dataAppointment).then((res) => {
      dispatch({ 
        type: "POST_USER", 
        payload: res.data 
      })
    })
  }
}

export const saveInfoEvent = (info) => {
  console.log('entre a la funcion');
    return({
      type: 'SAVE_INFO_EVENT',
      payload: info}
    )
}

export const allEvents = (id) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get("/events");
      const filter = data.filter(e => e.NutritionistId == id);
      return dispatch({
        type: "ALL_EVENTS",
        payload: filter
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const userNutriInfo = (id) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`/users/${id}`);
      return dispatch({
        type: "USER_INFO",
        payload: data
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export const eventsNutri = (filter) => {
  return ({
    type: "EVENTS_INFO",
    payload: filter
  })
}