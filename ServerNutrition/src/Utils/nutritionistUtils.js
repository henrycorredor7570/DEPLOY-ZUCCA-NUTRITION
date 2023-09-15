const { Nutritionist } = require("../db");

const getHorarioTrabajoCombinado = async () => {
  try {
    const nutricionistasDesdeBD = await Nutritionist.findAll({
      where: { isActive: true },
    });

    const horarioCombinado = {};

    for (let i = 0; i < nutricionistasDesdeBD.length; i++) {
      const diasDeTrabajo = nutricionistasDesdeBD[i].toJSON().diasDeTrabajo; //[[]]
      for (const day in diasDeTrabajo) {
        if (!horarioCombinado[day]) {
          horarioCombinado[day] = [];
        }
        horarioCombinado[day].push(...diasDeTrabajo[day]);
      }
    }
    console.log(horarioCombinado);
    return horarioCombinado;
  } catch (error) {
    return new Error(error);
  }
};


const calcularPuntosNutricionista = () => {};
const getDoc = (data) => {
  console.log(data[0]);
  data.sort((a, b) => a.data.Events.length - b.data.Events.length);
  return data[0];
};
module.exports = {
  getHorarioTrabajoCombinado,
  calcularPuntosNutricionista,
  getDoc,
};
