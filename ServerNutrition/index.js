require("dotenv").config()

const server = require("./src/app");
const { sequelize } = require("./src/db");
const PORT = process.env.PORT || 3001;

sequelize.sync({ alter: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server raise in PORT: ${PORT}`);
  });
});
