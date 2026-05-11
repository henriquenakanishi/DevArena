var express = require("express");
var router = express.Router();

var resultadoCpsController = require("../controllers/resultadoCpsController");

router.post("/cadastrar", function (req, res) {
    resultadoCpsController.cadastrar(req, res);
});

module.exports = router;