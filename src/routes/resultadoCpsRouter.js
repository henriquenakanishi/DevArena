var express = require("express");
var router = express.Router();

var resultadoCpsController = require("../controllers/resultadoCpsController");

router.post("/cadastrar", function (req, res) {
    resultadoCpsController.cadastrar(req, res);
});

router.get("/ranking", function (req, res) {
    resultadoCpsController.ranking(req, res);
});

router.get("/resumo/:fkUsuario", function (req, res) {
    resultadoCpsController.resumo(req, res);
});

router.get("/historico/:fkUsuario", function (req, res) {
    resultadoCpsController.historico(req, res);
});

module.exports = router;