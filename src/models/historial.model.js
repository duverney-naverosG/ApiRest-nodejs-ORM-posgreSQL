const DataTypes = require("sequelize");
const sequelize = require("../database/conexion");

const historial = sequelize.define(
  "historial",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha: {
      type: DataTypes.DATE,
    },
    id_vacuna: {
      type: DataTypes.INTEGER,
    },
    proxima_dosis: {
      type: DataTypes.DATE,
    },
    id_mascota: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = historial;
