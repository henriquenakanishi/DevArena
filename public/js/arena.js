// =========================
// BANCO DE PALAVRAS
// =========================

let palavrasBase = [];

// =========================
// ESTADO DO JOGO
// =========================

let estado = {
    linhas: [],
    linhaAtual: 0,
    palavraAtual: 0,
    tempo: 30,
    intervalo: null,
    acertos: 0,
    erros: 0,
    totalDigitadas: 0
};

// =========================
// ELEMENTOS
// =========================

const container = document.getElementById("wordContainer");
const input = document.getElementById("input");
const timer = document.getElementById("time");


// =========================
// BUSCAR PALAVRAS DO BACKEND
// =========================

async function carregarPalavras() {

    const resposta = await fetch("/palavras");

    palavrasBase = await resposta.json();

    console.log("Palavras carregadas:", palavrasBase);
}

carregarPalavras();


// =========================
// GERAR PALAVRAS
// =========================

function gerarPalavras(qtdLinhas = 20, qtdPorLinha = 10) {

    return Array.from({ length: qtdLinhas }, () =>

        Array.from({ length: qtdPorLinha }, () =>

            palavrasBase[Math.floor(Math.random() * palavrasBase.length)]
        )
    );
}


// =========================
// RENDERIZAR LINHA
// =========================

function renderizarLinha() {

    container.innerHTML = "";

    const linha = estado.linhas[estado.linhaAtual];

    const div = document.createElement("div");

    div.classList.add("line");

    linha.forEach(palavra => {

        const span = document.createElement("span");

        span.textContent = palavra;

        span.classList.add("word");

        div.appendChild(span);
    });

    container.appendChild(div);

    atualizarDestaque();
}


// =========================
// DESTAQUE
// =========================

function atualizarDestaque() {

    document.querySelectorAll(".word").forEach((el, i) => {

        el.classList.toggle("current", i === estado.palavraAtual);
    });
}


// =========================
// INICIAR JOGO
// =========================

function iniciarJogo() {

    estado = {
        linhas: gerarPalavras(),
        linhaAtual: 0,
        palavraAtual: 0,
        tempo: 30,
        intervalo: null,
        acertos: 0,
        erros: 0,
        totalDigitadas: 0
    };

    input.disabled = false;

    input.value = "";

    input.focus();

    timer.textContent = estado.tempo;

    renderizarLinha();

    iniciarTimer();
}


// =========================
// TIMER
// =========================

function iniciarTimer() {

    clearInterval(estado.intervalo);

    estado.intervalo = setInterval(() => {

        estado.tempo--;

        timer.textContent = estado.tempo;

        if (estado.tempo <= 0) {

            clearInterval(estado.intervalo);

            input.disabled = true;

            calcularResultado();
        }

    }, 1000);
}


// =========================
// INPUT
// =========================

input.addEventListener("keydown", (e) => {

    const palavraCorreta =
        estado.linhas[estado.linhaAtual][estado.palavraAtual];

    const palavrasDOM = document.querySelectorAll(".word");

    const atual = palavrasDOM[estado.palavraAtual];

    if (e.key === " ") {

        e.preventDefault();

        const palavraDigitada = input.value.trim();

        if (palavraDigitada === palavraCorreta) {

            atual.classList.add("correct");

            estado.acertos++;

        } else {

            atual.classList.add("error");

            estado.erros++;
        }

        estado.totalDigitadas++;

        proximaPalavra();
    }

    if (e.key === "Enter") {

        e.preventDefault();

        clearInterval(estado.intervalo);

        input.disabled = true;

        calcularResultado();
    }
});


// =========================
// PRÓXIMA PALAVRA
// =========================

function proximaPalavra() {

    estado.palavraAtual++;

    input.value = "";

    if (
        estado.palavraAtual >=
        estado.linhas[estado.linhaAtual].length
    ) {

        estado.linhaAtual++;

        estado.palavraAtual = 0;

        renderizarLinha();

    } else {

        atualizarDestaque();
    }
}


// =========================
// RESULTADO
// =========================

function calcularResultado() {

    const tempoMinutos = 30 / 60;

    const wpm = Math.round(estado.acertos / tempoMinutos);

    const precisao = estado.totalDigitadas > 0

        ? Math.round(
            (estado.acertos / estado.totalDigitadas) * 100
        )

        : 0;

    finalizarTeste(wpm, precisao, 30);
}


// =========================
// FINALIZAR
// =========================

function finalizarTeste(wpm, precisao, tempo) {

    var fkUsuario = sessionStorage.ID_USUARIO || 1;

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

    .then(() => {

        mostrarDashboardFinal(
            wpm,
            precisao,
            tempo,
            fkUsuario
        );
    });
}