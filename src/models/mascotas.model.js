const DataTypes = require("sequelize");
const sequelize = require("../database/conexion");
const historial = require("../models/historial.model");

const mascotas = sequelize.define(
  "mascotas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombres: {
      type: DataTypes.STRING,
    },
    raza: {
      type: DataTypes.STRING,
    },
    edad: {
      type: DataTypes.INTEGER,
    },
    id_propietario: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

mascotas.hasMany(historial, {
  foreignKey: "id_mascota",
  sourceKey: "id",
});

historial.belongsTo(mascotas, {
  foreignKey: "id_mascota",
  targetKey: "id",
});

module.exports = mascotas;
