const { obtenerVacunas, obtenerVacuna, insertarVacuna, eliminarVacuna, actualizarVacuna} = require("../controllers/vacuna.controllers");

const router = require("express").Router();

router.get("/vacunas", obtenerVacunas);

router.get("/vacunas/:id", obtenerVacuna);

router.post("/vacunas", insertarVacuna);

router.delete("/vacunas/:id", eliminarVacuna);

router.put("/vacunas/:id", actualizarVacuna);

module.exports.router = router;
