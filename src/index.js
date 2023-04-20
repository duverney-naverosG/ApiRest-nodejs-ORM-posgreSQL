const express = require("express");
const morgan = require("morgan");
const sequelize = require("./database/conexion");
require("./models/usuarios.model");
require("./models/mascotas.model");
require("./models/vacunas.model");
require("./models/historial.model");

//IMPORTACION DE LAS RUTAS
const HistorialRouter = require("./routes/historial.routes");
const mascotasRouter = require("./routes/mascotas.routes");
const usuariosRouter = require("./routes/usuarios.routes");
const vacunasRouter = require("./routes/vacunas.routes");

require("dotenv").config();

const app = express();

//MIDDEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const conexion = async () => {
  try {
    await sequelize.authenticate();
    //await sequelize.sync({ alter: true }); //sincronizacion con el modelo y la base de datos
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

conexion();

//RUTAS
app.get("/", (req, res) => {
  res.send("on");
});

app.use("/api/", HistorialRouter.router);
app.use("/api/", mascotasRouter.router);
app.use("/api/", usuariosRouter.router);
app.use("/api/", vacunasRouter.router);

app.listen(process.env.PORT, () => {
  console.log("server on");
});
