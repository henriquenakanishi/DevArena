var database = require("../database/config");

function cadastrar(wpm, precisao, tempo, fkUsuario) {
    var instrucao = `
        insert into resultado (wpm, precisao, tempo, fkUsuario)
        values (${wpm}, ${precisao}, ${tempo}, ${fkUsuario});
    `;

    return database.executar(instrucao);
}

function ranking() {
    var instrucao = `
        select u.nome, r.wpm, r.precisao, r.tempo, r.dataHora
        from resultado r
        join usuario u on r.fkUsuario = u.idUsuario
        order by r.wpm desc, r.precisao desc
        limit 10;
    `;

    return database.executar(instrucao);
}

function resumo() {
    var instrucao = `
        select 
            count(*) as totalPartidas,
            max(wpm) as melhorWpm,
            round(avg(wpm), 2) as mediaWpm,
            round(avg(precisao), 2) as mediaPrecisao
        from resultado;
    `;

    return database.executar(instrucao);
}

function historico(fkUsuario) {
    var instrucao = `
        select wpm, precisao, tempo, dataHora
        from resultado
        where fkUsuario = ${fkUsuario}
        order by dataHora asc;
    `;

    return database.executar(instrucao);
}



module.exports = {
    cadastrar,
    ranking,
    resumo,
    historico
};