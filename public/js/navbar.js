function abrirMenuPerfil() {

    var menu = document.getElementById("perfilDropdown");

    if (menu.style.display == "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }

}

if (sessionStorage.NOME_USUARIO != undefined) {

    document.getElementById("nomeUsuario").innerHTML =
        sessionStorage.NOME_USUARIO;

}

function sair() {

    sessionStorage.clear();

}