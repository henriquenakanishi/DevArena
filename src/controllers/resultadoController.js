var resultadoModel = require("../models/resultadoModel");

function cadastrar(req, res) {
    var wpm = req.body.wpm;
    var precisao = req.body.precisao;
    var tempo = req.body.tempo;
    var fkUsuario = req.body.fkUsuario;

    resultadoModel.cadastrar(wpm, precisao, tempo, fkUsuario)
        .then(() => res.status(200).send("Resultado salvo"))
        .catch(erro => res.status(500).json(erro));
}

function ranking(req, res) {
    resultadoModel.ranking()
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro));
}

function resumo(req, res) {
    resultadoModel.resumo()
        .then(resultado => res.json(resultado[0]))
        .catch(erro => res.status(500).json(erro));
}

function historico(req, res) {
    var fkUsuario = req.params.fkUsuario;

    resultadoModel.historico(fkUsuario)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro));
}

module.exports = {
    cadastrar,
    ranking,
    resumo,
    historico
};