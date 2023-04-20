const { obtenerMascotas, obtenerMascota, insertarMascota, eliminarMascota, actualizarMascota } = require("../controllers/mascotas.controllers");

const router = require("express").Router();

router.get("/mascotas", obtenerMascotas);

router.get("/mascotas/:id", obtenerMascota);

router.post("/mascotas", insertarMascota);

router.delete("/mascotas/:id", eliminarMascota);

router.put("/mascotas/:id", actualizarMascota);

module.exports.router = router;
