const { obtenerUsuarios, obtenerUsuario, insertarUsuario, eliminarUsuario, actualizarUsuario} = require("../controllers/usuarios.controller");

const router = require("express").Router();

router.get("/usuarios", obtenerUsuarios);

router.get("/usuarios/:id", obtenerUsuario);

router.post("/usuarios", insertarUsuario);

router.delete("/usuarios/:id", eliminarUsuario);

router.put("/usuarios/:id", actualizarUsuario);

module.exports.router = router;
