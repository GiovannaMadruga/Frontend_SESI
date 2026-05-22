function executarSistemas() {

    // Tratamento de erros para o sistema não quebrar
    try {
        // Dados de entrada
        const inputNome = document.getElementById("inputNome"); // o VALUE é para pegar as coisas do site, ex: o nome do cliente 
        const inputIdade = document.getElementById("inputIdade");
        const inputValor = document.getElementById("inputValor");
        const inputCupom = document.getElementById("inputCupom");

        // Dados de saída
        const msg = document.getElementById("mensagem - autorizacao"); // Aqui não precisa do VALUE pq não tem dados para preencher
        const lista = document.getElementById("lista - estoque");
        const relatorio = document.getElementById("relatorio - final");

        const btn = document.getElementById("bntFinalizar");

        btn.disable = true;
        btn.innerText = "Processando...";

        // Trin() Remove os espços em branco
        const nome = inputNome.value.trim();
        const idade = parseInt(inputIdade.value);
        const valor = parseFloat(inputValor.value);
        const cupom = inputCupom.value === "true";

        // Validação para campos vazios
        if (!nome || isNaN(idade) || isNaN(valor)) {
            msg.innerText = "Preencha todos os campos corretamente!";
            msg.style.color = "rgb(12, 12, 12)"
            return;
        }

        // Regra de negócio
        if (idade >= 16) {
            ;
            msg.innerText = `Venda autorizada: ${nome}`;
            msg.style.color = "#000000";

            // Desconto
            let valorFinal = (valor > 500 || cupom) ? valor * 0.85 : valor;

            // Estoque 
            let estoque = ["Placa de Vídeo", "Processador", "Memória RAM"];
            lista.innerHTML = " "; // Coloca algo 

            // forEach; Percorre um array e aplica uma ação para cada elemento
            estoque.forEach(item => {
                let li = document.createElement("li");
                li.innerText = `Item ${item} reservado.`;
                lista.appendChild(li); // Usado para adicionar um novo elemento ou texto
            });

            // Relatório
            relatorio.style.display = "block";
            relatorio.innerHTML = `
    <strong> RESUMO DO PEDIDO <\strong><br>
    Cliente: ${nome} <br>
    Total Original: R$ ${valor.toFixed(2)} <br>
    <strong> Total com Desconto: R$ ${valorFinal.toFixed(2)} <\strong>
    `;

        } else {
            msg.innerText = "Venda bloqueada: Menor de 16 anos.";
            msg.style.color = "#ff4444";
            relatorio.style.display = "none";
            lista.innerHTML = " ";
        }
    } catch (error) {

    }
}