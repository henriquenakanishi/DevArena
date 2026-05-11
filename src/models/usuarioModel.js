var database = require("../database/config");

function autenticar(email, senha) {
    var instrucaoSql = `
        select idUsuario, nome, email, senha
        from usuario
        where email = '${email}'
        and senha = '${senha}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha) {
    var instrucaoSql = `
        insert into usuario (nome, email, senha)
        values ('${nome}', '${email}', '${senha}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};