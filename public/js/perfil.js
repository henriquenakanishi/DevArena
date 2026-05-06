var fkUsuario = sessionStorage.ID_USUARIO || 1;

fetch(`/resultado/historico/${fkUsuario}`)
    .then(res => res.json())
    .then(historico => {
        var tbody = document.getElementById("tbody_historico");

        var melhorWpm = 0;
        var somaWpm = 0;
        var somaPrecisao = 0;

        var labels = [];
        var dadosWpm = [];

        tbody.innerHTML = "";

        for (var i = 0; i < historico.length; i++) {
            var partida = historico[i];

            somaWpm += partida.wpm;
            somaPrecisao += partida.precisao;

            if (partida.wpm > melhorWpm) {
                melhorWpm = partida.wpm;
            }

            labels.push((i + 1) + "ª partida");
            dadosWpm.push(partida.wpm);

            tbody.innerHTML += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${partida.wpm}</td>
                    <td>${partida.precisao}%</td>
                    <td>${partida.tempo}s</td>
                </tr>
            `;
        }

        var total = historico.length;

        document.getElementById("melhor_wpm").innerHTML = melhorWpm;
        document.getElementById("media_wpm").innerHTML = total > 0 ? Math.round(somaWpm / total) : 0;
        document.getElementById("media_precisao").innerHTML = total > 0 ? Math.round(somaPrecisao / total) + "%" : "0%";
        document.getElementById("total_partidas").innerHTML = total;

        new Chart(document.getElementById("graficoPerfil"), {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "WPM",
                    data: dadosWpm,
                    borderColor: "#facc15",
                    backgroundColor: "rgba(250, 204, 21, 0.2)",
                    tension: 0.4,
                    fill: true
                }]
            }
        });
    });