const vacunas = require("../models/vacunas.model");
const { Op } = require("sequelize");

const obtenerVacunas = async (req, res) => {
  try {
    const vacuna = await vacunas.findAll();
    res.json(vacuna);
  } catch (error) {
    res.status(500).json({ "mensaje": error });
  }
};

const obtenerVacuna = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  let nombreFinal = "%" + nombre + "%";

  try {
    const vacuna = await vacunas.findAll({
      where: {
        [Op.or]: [{ id: id }, { nombre: { [Op.like]: nombreFinal } }],
      },
    });
    if (!vacuna) {
      return res.status(404).json("la vacuna no esta registrada");
    }

    res.status(200).json(vacuna);
  } catch (error) {
    res.status(500).json({ "mensaje": error });
  }
};

const insertarVacuna = async (req, res) => {
  const { nombre } = req.body;
  if (nombre == null) {
    return res.status(500).json({ mensaje: "debe llenar todo los datos" });
  }
  try {
    await vacunas.create({
      nombre,
    });

    res.status(200).json("vacuna insertada");
  } catch (error) {
    res.status(500).json({ "mensaje": error });
  }
};

const actualizarVacuna = async (req, res) => {
  const { id } = req.params;
  try {
    const vacuna = await vacunas.findOne({
      where: { id },
    });
    vacuna.set(req.body);
    vacuna.save();
    res.status(200).json("usuario actualizado");
  } catch (error) {
    res.status(500).json({ "mensaje": error });
  }
};

const eliminarVacuna = async (req, res) => {
  const { id } = req.params;
  try {
    vacunas.destroy({
      where: {
        id,
      },
    });

    res.status(200).json("vacuna eliminada");
  } catch (error) {
    res.status(500).json({ "mensaje": error });
  }
};

module.exports = {
  obtenerVacunas,
  obtenerVacuna,
  insertarVacuna,
  actualizarVacuna,
  eliminarVacuna,
};
