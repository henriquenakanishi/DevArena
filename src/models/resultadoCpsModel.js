var database = require("../database/config");

function cadastrar(cliques, cps, tempo, fkUsuario) {
    var instrucao = `
        insert into resultado_cps (cliques, cps, tempo, fk_usuario)
        values (${cliques}, ${cps}, ${tempo}, ${fkUsuario});
    `;

    return database.executar(instrucao);
}

module.exports = {
    cadastrar
};