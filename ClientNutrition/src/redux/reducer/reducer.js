import { getLoggedInUser } from "./../../utils/UserUtils";

const initialState = {
  users: [],
  nutritionists: [],
  allNutritionists: [],
  quotes: [],
  appointments: [],
  user: getLoggedInUser(),
  schedules: {},
  infoEvent: {},
  nutriInfo: {},
  nutriEvents: [],
  usersInfo: [],
  admins: [],
  usersEvents: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_NUTRITIONISTS":
      return {
        ...state,
        allNutritionists: action.payload,
        nutritionists: action.payload,
      };
    case "GET_NUTRITIONISTS_NAME":
      return {
        ...state,
        nutritionists: action.payload,
      };

    case "GET_DETAIL":
      return {
        ...state,
        nutritionists: action.payload,
      };

    case "POST_USER":
      return {
        ...state,
        users: action.payload,
      };

    case "GET_USERS":
      const filtered = action.payload.filter((e) => e.role === "user");
      const filtered2 = action.payload.filter((e) => e.role === "admin");
      return {
        ...state,
        users: filtered,
        admins: filtered2,
      };
    case "GET_APPOINTMENTS":
      return {
        ...state,
        appointments: action.payload,
      };
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT": {
      return {
        ...state,
        user: null,
      };
    }
    case "GET_SCHEDULES":
      return {
        ...state,
        schedules: action.payload,
      };
    case "GET_NUTRICIONIST_SCHEDULES":
      return {
        ...state,
        schedules: action.payload,
      };
    case "GET_NUTRICIONIST_NAME":
      return {
        ...state,
        nutriInfo: {
          name: action.payload.name,
          lastName: action.payload.lastName,
        },
      };
    case "POST_APPOINTMENT":
      return {
        ...state,
        appointments: action.payload,
      };
    case "SAVE_INFO_EVENT":
      return {
        ...state,
        infoEvent: action.payload,
      };
    case "EVENTS_INFO":
      return {
        ...state,
        nutriEvents: action.payload,
      };
    case "USER_INFO":
      return {
        ...state,
        usersInfo: [...state.usersInfo, action.payload],
      };
    case "GET_USERS_DETAIL":
      return {
        ...state,
        usersEvents: action.payload
      }
    default:
      return { ...state };
  }
};

export default rootReducer;
