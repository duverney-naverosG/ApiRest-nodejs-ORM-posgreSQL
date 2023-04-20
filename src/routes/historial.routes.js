const {
  obtenerHistoriales,
  obtenerHistorial,
  insertarHistorial,
  eliminarHistorial,
  actualizarHistorial,
} = require("../controllers/historial.controllers");

const router = require("express").Router();

router.get("/historial", obtenerHistoriales);

router.get("/historial/:id", obtenerHistorial);

router.post("/historial", insertarHistorial);

router.delete("/historial/:id", eliminarHistorial);

router.put("/historial/:id", actualizarHistorial);

module.exports.router = router;
