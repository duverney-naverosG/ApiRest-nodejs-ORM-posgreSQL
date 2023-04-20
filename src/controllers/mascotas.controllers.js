const mascotas = require("../models/mascotas.model");
const usuarios = require("../models/usuarios.model");

const obtenerMascotas = async (req, res) => {
  try {
    const mascota = await mascotas.findAll();
    res.json(mascota);
  } catch (error) {
    res.status(500).json({ "mensaje": error });
  }
};

const obtenerMascota = async (req, res) => {
  try {
    const usuario = await usuarios.findOne({
      where: { identificacion: req.params.id },
    });

    if (!usuario) {
      return res.status(404).json("no existe el usuario");
    }

    const mascota = await mascotas.findAll({
      where: {
        id_propietario: usuario.id,
      },
    });

    if (!mascota) {
      return res.status(404).json("el usuario no tiene mascotas registradas");
    }

    res.json(mascota);
  } catch (error) {
    res.status(500).json({ "mensaje": error });
  }
};

const insertarMascota = async (req, res) => {
  const { nombres, raza, edad, cedula_propietario } = req.body;

  if (nombres == null || raza == null || edad == null || cedula_propietario == null) {
    return res.status(500).json({ mensaje: "debe llenar todo los datos" });
  }

  try{
    const usuario = await usuarios.findOne({
      where: { identificacion: cedula_propietario },
    });

    if (!usuario) {
      return res.status(404).json("no existe el usuario");
    }

    await mascotas.create({
      nombres,
      raza,
      edad,
      id_propietario: usuario.id,
    });

    res.status(200).json("mascota insertada");

  } catch (error) {
    res.status(500).json({ "mensaje": error });
  }
};

const actualizarMascota = async (req, res) => {
  const { nombres, raza, edad, cedula_propietario } = req.body;
  const { id } = req.params;
  if (  nombres == null || raza == null ||  edad == null || cedula_propietario == null) {
    return res.status(500).json({ mensaje: "debe llenar todo los datos" });
  }

  try {
    const usuario = await usuarios.findOne({
      where: { identificacion: cedula_propietario },
    });

    if (!usuario) {
      return res.status(404).json("no existe el usuario");
    }

    const mascota = await mascotas.findByPk(id);
    mascota.nombres = nombres;
    mascota.raza = raza;
    mascota.edad = edad;
    mascota.id_propietario = usuario.id;

    await mascota.save();

    res.status(200).json("mascota actualizada");

  } catch (error) {
    res.status(500).json({ "mensaje": error });
  }
};

const eliminarMascota = async (req, res) => {
  const { id } = req.params;
  try {
    mascotas.destroy({
      where: {
        id,
      },
    });

    res.status(200).json("mascota eliminada");
  } catch (error) {
    res.status(500).json({ "mensaje": error });
  }
};

module.exports = {
  obtenerMascotas,
  obtenerMascota,
  insertarMascota,
  actualizarMascota,
  eliminarMascota,
};
