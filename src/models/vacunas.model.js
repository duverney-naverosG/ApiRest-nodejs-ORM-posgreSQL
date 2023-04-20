const DataTypes = require("sequelize");
const sequelize = require("../database/conexion");
const historial = require("../models/historial.model");

const vacunas = sequelize.define(
  "vacunas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

vacunas.hasMany(historial, {
  foreignKey: "id_vacuna",
  sourceKey: "id",
});

historial.belongsTo(vacunas, {
  foreignKey: "id_vacuna",
  targetKey: "id",
});

module.exports = vacunas;
