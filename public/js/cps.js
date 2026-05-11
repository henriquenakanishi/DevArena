let qtdCliques = 0;
let tempo = 10;
let rodando = false;
let intervalo;

function contarClique() {

    if (rodando == false) {
        rodando = true;

        intervalo = setInterval(function () {

            tempo--;

            document.getElementById("tempo").innerHTML = tempo;

            if (tempo == 0) {

                clearInterval(intervalo);

                document.getElementById("btnClique").disabled = true;
                document.getElementById("btnClique").innerHTML = "Finalizado";

                let resultado = qtdCliques / 10;

                document.getElementById("cps").innerHTML = resultado.toFixed(2);

                fetch("/resultadoCps/cadastrar", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        cliques: qtdCliques,
                        cps: resultado.toFixed(2),
                        tempo: 10,
                        fkUsuario: sessionStorage.ID_USUARIO
                    })
                });

            }

        }, 1000);
    }

    if (tempo > 0) {

        qtdCliques++;

        document.getElementById("cliques").innerHTML = qtdCliques;

    }
}

function reiniciarCPS() {

    qtdCliques = 0;
    tempo = 10;
    rodando = false;

    clearInterval(intervalo);

    document.getElementById("tempo").innerHTML = 10;
    document.getElementById("cliques").innerHTML = 0;
    document.getElementById("cps").innerHTML = 0;

    document.getElementById("btnClique").disabled = false;
    document.getElementById("btnClique").innerHTML = "Clique Aqui";

}