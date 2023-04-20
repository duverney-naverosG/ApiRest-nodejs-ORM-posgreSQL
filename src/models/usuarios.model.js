const DataTypes = require("sequelize");
const sequelize = require("../database/conexion");
const mascotas = require("../models/mascotas.model");

const usuarios = sequelize.define(
  "usuarios",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    identificacion: {
      type: DataTypes.INTEGER,
    },
    nombres: {
      type: DataTypes.STRING,
    },
    direccion: {
      type: DataTypes.STRING,
    },
    telefono: {
      type: DataTypes.BIGINT,
    },
    correo: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

usuarios.hasMany(mascotas, {
  foreignKey: "id_propietario",
  sourceKey: "id",
});

mascotas.belongsTo(usuarios, {
  foreignKey: "id_propietario",
  targetKey: "id",
});

module.exports = usuarios;
