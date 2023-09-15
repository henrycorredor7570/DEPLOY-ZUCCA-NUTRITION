const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "WellnessPlan",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      dailyMeals: {//array  de longitud 4, desayuno almuerxo y merienda
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      groceryList: {//lista de supermercados
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      suggestedFoods: {//plattos de comidas
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      workoutPlan: {//rutina de ejercicios
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      goals: {// metas
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { timestamps: false }
  );
};
