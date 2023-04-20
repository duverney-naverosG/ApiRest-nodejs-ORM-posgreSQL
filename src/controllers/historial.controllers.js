const historial = require("../models/historial.model");
const mascotas = require("../models/mascotas.model");

const obtenerHistoriales = async (req, res) => {
  try {
    const historiales = await historial.findAll();
    if (!historiales) {
      return res.status(404).json("no existe historiales para la mascota");
    }
    res.json(historiales);
  } catch (error) {
    res.status(500).json({ "mensaje": error });
  }
};

const obtenerHistorial = async (req, res) => {
  try {
    const historiales = await historial.findAll({
      where: {
        id_mascota: req.params.id,
      },
    });

    if (historiales.length <= 0) {
      return res.status(404).json("no hay historiales para la mascota");
    }

    res.status(200).json(historiales);

  } catch (error) {
    res.status(500).json({ "mensaje": error });
  }
};

const insertarHistorial = async (req, res) => {
  const { fecha, id_vacuna, proxima_dosis, id_mascota } = req.body;
  if ( fecha == null || id_vacuna == null || proxima_dosis == null || id_mascota == null) {
    return res.status(500).json({ mensaje: "debe llenar todo los datos" });
  }

  try {

    const historiales = await historial.create({
      fecha,
      id_vacuna,
      proxima_dosis,
      id_mascota,
    });

    res.status(200).json("historial insertado");

  } catch (error) {
    res.status(500).json({ "mensaje": error });
  }
};

const actualizarHistorial = async (req, res) => {
  const { fecha, id_vacuna, proxima_dosis, id_mascota } = req.body;

  if ( fecha == null || id_vacuna == null || proxima_dosis == null || id_mascota == null) {
    return res.status(500).json({ mensaje: "debe llenar todo los datos" });
  }

  try {
    const historiales = await historial.findByPk(req.params.id);
    historiales.fecha = fecha;
    historiales.id_vacuna = id_vacuna;
    historiales.proxima_dosis = proxima_dosis;
    historiales.id_mascota = id_mascota;

    await historiales.save();

    res.status(200).json("historial actualizado");
  } catch (error) {
    res.status(500).json({ "mensaje": error });
  }
};

const eliminarHistorial = async (req, res) => {
  const { id } = req.params;
  try {
    historial.destroy({
      where: {
        id,
      },
    });

    res.status(200).json("historial eliminado");
  } catch (error) {
    res.status(500).json({ "mensaje": error });
  }
};

module.exports = {
  obtenerHistoriales,
  obtenerHistorial,
  insertarHistorial,
  actualizarHistorial,
  eliminarHistorial,
};
