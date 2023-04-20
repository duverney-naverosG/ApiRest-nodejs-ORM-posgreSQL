const usuarios = require("../models/usuarios.model");

const obtenerUsuarios = async (req, res) => {
  try {
    const usuario = await usuarios.findAll();
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ "mensaje": error });
  }
};

const obtenerUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await usuarios.findByPk(id);
    if (!usuario) {
      return res.status(404).json("no existe el usuario");
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ "mensaje": error });
  }
};

const insertarUsuario = async (req, res) => {
  const { identificacion, nombres, direccion, telefono, correo } = req.body;
  if ( identificacion == null || nombres == null || direccion == null || telefono == null || correo == null ) {
    return res.status(500).json({ mensaje: "debe llenar todo los datos" });
  }

  try {
    await usuarios.create({
      identificacion,
      nombres,
      direccion,
      telefono,
      correo,
    });

    res.status(200).json("usuario insertado");
  } catch (error) {
    res.status(500).json({ "mensaje": error });
  }
};

const actualizarUsuario = async (req, res) => {
  const { identificacion, nombres, direccion, telefono, correo } = req.body;
  const { id } = req.params;

  try {
    const usuario = await usuarios.findByPk(id);
    usuario.identificacion = identificacion;
    usuario.nombres = nombres;
    usuario.direccion = direccion;
    usuario.telefono = telefono;
    usuario.correo = correo;

    await usuario.save();

    res.status(200).json("usuario actualizado");
  } catch (error) {
    res.status(500).json({ "mensaje": error });
  }
};

const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    usuarios.destroy({
      where: {
        id,
      },
    });

    res.status(200).json("usuario eliminado");
  } catch (error) {
    res.status(500).json({ "mensaje": error });
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuario,
  insertarUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
