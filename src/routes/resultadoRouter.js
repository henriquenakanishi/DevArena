var express = require("express");
var router = express.Router();

var resultadoController = require("../controllers/resultadoController");

router.post("/cadastrar", function (req, res) {
    resultadoController.cadastrar(req, res);
});

router.get("/ranking", function (req, res) {
    resultadoController.ranking(req, res);
});

router.get("/resumo", function (req, res) {
    resultadoController.resumo(req, res);
});

router.get("/historico/:fkUsuario", function (req, res) {
    resultadoController.historico(req, res);
});

module.exports = router;