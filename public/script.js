let score = 0;

function verificarDesafio() {
    fetch('http://localhost:3000/dados-frutas')
        .then(response => response.json())
        .then(data => {
            let desafioConcluido = false;

            data.forEach(fruit => {
                const fruta = fruit.nome_alimento;
                const pesoBruto = fruit.peso_bruto;

                // Verifica se o Peso adicionado ao banco de dados é aproximado a 100 gramas
                if (pesoBruto >= 0.09 && pesoBruto <= 0.11) {
                    desafioConcluido = true;
                }
            });

            // Verifica se o desafio foi concluido e adiciona a pontuação
            if (desafioConcluido) {
                score += 10;
                document.getElementById('feedback').innerText = "Desafio concluído! +10 pontos";
            } else {
                document.getElementById('feedback').innerText = "Desafio não concluído. Tente novamente!";
            }

            // Atualiza a pontuação na tela
            document.getElementById('score').innerText = `Pontuação: ${score}`;
        })
        .catch(error => {
            document.getElementById('feedback').innerText = `Erro ao verificar desafio: ${error.message}`;
        });
}

//event listener para o botão "Pronto"
document.getElementById('prontoButton').addEventListener('click', verificarDesafio);
