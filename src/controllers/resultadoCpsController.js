var resultadoCpsModel = require("../models/resultadoCpsModel");

function cadastrar(req, res) {
    var cliques = req.body.cliques;
    var cps = req.body.cps;
    var tempo = req.body.tempo;
    var fkUsuario = req.body.fkUsuario;

    resultadoCpsModel.cadastrar(cliques, cps, tempo, fkUsuario)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    cadastrar
};
