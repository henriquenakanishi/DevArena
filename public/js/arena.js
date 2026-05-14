let palavrasBase = [
    "universidade", "javascript", "desenvolvimento", "arena", "digitação",
    "teste", "resultado", "precisão", "velocidade", "prática",
    "computador", "teclado", "monitor", "mouse", "código",
    "software", "hardware", "internet", "servidor", "cliente",
    "banco", "dados", "segurança", "performance", "algoritmo",
    "função", "variável", "array", "string", "console",
    "frontend", "backend", "devarena", "ranking", "dashboard",
    "wpm", "cpm", "tempo", "jogo", "aprendizado",
    "foco", "disciplina", "motivação", "tecnologia", "futuro"
];

let palavrasDoJogo = [];
let palavraAtual = 0;
let paginaAtual = 0;
let palavrasPorPagina = 10;
let tempo = 30;
let intervalo = null;

let acertos = 0;
let erros = 0;
let totalDigitadas = 0;
let jogoFinalizado = false;

let container = document.getElementById("wordContainer");
let input = document.getElementById("input");
let timer = document.getElementById("time");

function sortearPalavras() {
    palavrasDoJogo = [];

    for (let i = 0; i < 100; i++) {
        let numero = Math.floor(Math.random() * palavrasBase.length);
        palavrasDoJogo.push(palavrasBase[numero]);
    }
}

function mostrarPalavras() {
    container.innerHTML = "";

    for (let i = paginaAtual * palavrasPorPagina; i < (paginaAtual + 1) * palavrasPorPagina; i++) {
        let span = document.createElement("span");

        span.innerHTML = palavrasDoJogo[i];
        span.classList.add("word");

        if (i == palavraAtual) {
            span.classList.add("current");
        }

        container.appendChild(span);
    }
}

function iniciarJogo() {
    clearInterval(intervalo);

    palavraAtual = 0;
    tempo = 30;
    acertos = 0;
    erros = 0;
    totalDigitadas = 0;
    jogoFinalizado = false;

    input.disabled = false;
    input.value = "";
    input.focus();

    timer.innerHTML = tempo;

    sortearPalavras();
    mostrarPalavras();
    iniciarTimer();
}

function iniciarTimer() {
    intervalo = setInterval(function () {
        tempo--;
        timer.innerHTML = tempo;

        if (tempo <= 0) {
            finalizarJogo();
        }
    }, 1000);
}

input.addEventListener("keydown", function (evento) {
    if (evento.key == " ") {
        evento.preventDefault();

        if (jogoFinalizado == true) {
            return;
        }

        let palavraDigitada = input.value.trim();
        let palavraCorreta = palavrasDoJogo[palavraAtual];

        let palavrasTela = document.querySelectorAll(".word");
        let palavraNaTela = palavrasTela[palavraAtual % 10];
        

        if (palavraDigitada == palavraCorreta) {
            palavraNaTela.classList.add("correct");
            acertos++;
        } else {
            palavraNaTela.classList.add("error");
            erros++;
        }

        totalDigitadas++;
        palavraAtual++;

        if (totalDigitadas % 10 == 0) {
            paginaAtual++;
            mostrarPalavras();
        }

        input.value = "";

    }

    if (evento.key == "Enter") {
        finalizarJogo();
    }
});

function finalizarJogo() {
    if (jogoFinalizado == true) {
        return;
    }

    jogoFinalizado = true;

    clearInterval(intervalo);

    tempo = 0;
    timer.innerHTML = 0;
    input.disabled = true;

    calcularResultado();
}

function calcularResultado() {
    let tempoMinutos = 30 / 60;

    let wpm = Math.round(acertos / tempoMinutos);

    let precisao = 0;

    if (totalDigitadas > 0) {
        precisao = Math.round((acertos / totalDigitadas) * 100);
    }

    salvarResultado(wpm, precisao, 30);
}

function salvarResultado(wpm, precisao, tempo) {
    let fkUsuario = sessionStorage.ID_USUARIO || 1;

    fetch("/resultado/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            wpm: wpm,
            precisao: precisao,
            tempo: tempo,
            fkUsuario: fkUsuario
        })
    })
        .then(function () {
            mostrarResultado(wpm, precisao, tempo);
        })
        .catch(function (erro) {
            console.log("Erro ao salvar resultado:", erro);
            mostrarResultado(wpm, precisao, tempo);
        });
}

function mostrarResultado(wpm, precisao, tempo) {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("card_resultado").style.display = "flex";

    document.getElementById("wpm_final").innerHTML = wpm;
    document.getElementById("precisao_final").innerHTML = precisao;
    document.getElementById("tempo_final").innerHTML = tempo;
}   