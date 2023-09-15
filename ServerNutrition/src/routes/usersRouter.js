// ruta usuarios
const { Router } = require("express");
const usersRouter = Router();

const {
  signup,
  destroy,
  updateUserHanlder,
  getAllUsersHandler,
  login,
  user,
  loginOauth,
  signupOauth,
  activate,
  userId,
} = require("../handlers/usersHandler");

const { ensureToken, onlyAdmin } = require("../Utils/seguridad");

// endpoints: ruta de acceso a nuestro backend;
usersRouter.get(
  "/allUsers",

  getAllUsersHandler
);
usersRouter.get("/", ensureToken, user);
usersRouter.put("/update", ensureToken, updateUserHanlder);
usersRouter.get("/:id", userId);

/* usersRouter.delete("/", deleteUserHandler); */
usersRouter.delete("/delete/:id",destroy);
usersRouter.put("/activate/:id", activate);
usersRouter.post("/signup", signup);
// logueo con terceros(Google)
usersRouter.post("/login", login);
usersRouter.post("/login/oauth2.0", loginOauth);
usersRouter.post("/signup/oauth2.0", signupOauth);

module.exports = usersRouter;
