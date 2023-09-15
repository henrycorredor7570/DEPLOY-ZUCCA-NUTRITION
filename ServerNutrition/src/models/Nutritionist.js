const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Nutritionist",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 20],
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 20],
        },
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: "imagen.jpg",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      diasDeTrabajo: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      busyDays: {
        type: DataTypes.JSON,
        defaultValue: {}, // Set an appropriate initial value
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      googleId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
    },
    { timestamps: false }
  );
};
