function executarSistemas() {

    // Tratamento de erros para o sistema não quebrar
    try {
        // Dados de entrada
        const inputNome = document.getElementById("inputNome"); // o VALUE é para pegar as coisas do site, ex: o nome do cliente 
        const inputIdade = document.getElementById("inputIdade");
        const inputValor = document.getElementById("inputValor");
        const inputCupom = document.getElementById("inputCupom");
        const inputVip = document.getElementById("inputVip");

        // Dados de saída
        const msg = document.getElementById("mensagem-autorizacao");
        const lista = document.getElementById("lista-estoque");
        const relatorio = document.getElementById("relatorio-final");

        const btn = document.getElementById("btnFinalizar");

        btn.disabled = true;
        btn.innerText = "Processando...";
        btn.disabled = false;
        btn.innerText = "Finalizar Venda";

        // Trin() Remove os espços em branco
        const nome = inputNome.value.trim();
        const idade = parseInt(inputIdade.value);
        console.log("Idade =", idade);
        const valor = parseFloat(inputValor.value);
        const cupom = inputCupom.value === "true";
        const vip = inputVip.value === "true";

        // Validação para campos vazios
        if (!nome || isNaN(idade) || isNaN(valor)) {
            msg.innerText = "Preencha todos os campos corretamente!";
            msg.style.color = "rgb(12, 12, 12)"
            return;
        }

        // Regra de negócio
        if (idade >= 16) {;
            msg.innerText = `Venda autorizada: ${nome}`;
            msg.style.color = "#000000";

            let valorFinal = valor;
            let desconto = 0;

            // Cliente VIP recebe 25%
            if (vip) {
                desconto = 25;
                valorFinal = valor * 0.75;
            }
            // Cliente comum com cupom ou compra acima de R$500 recebe 15%
            else if (valor > 500 || cupom) {
                desconto = 15;
                valorFinal = valor * 0.85;
            }

            // Estoque 
            let estoque = ["Placa de Vídeo", "Processador", "Memória RAM"];
            lista.innerHTML = " "; // Coloca algo 

            // forEach; Percorre um array e aplica uma ação para cada elemento
            estoque.forEach(item => {
                let li = document.createElement("li");
                li.innerText = `Item ${item} reservado.`;
                lista.appendChild(li); // Usado para adicionar um novo elemento ou texto
            });


            //RELATÓRIO
            relatorio.style.display = "block";
            console.log("msg:", msg);
            console.log("lista:", lista);
            console.log("relatorio:", relatorio);
            console.log("btn:", btn);

            relatorio.innerHTML = `
            <strong>RESUMO DO PEDIDO</strong><br>

            Cliente: ${nome}<br>
            Status: ${vip ? "⭐ CLIENTE VIP" : "Cliente Comum"}<br>
            Total Original: R$ ${valor.toFixed(2)}<br>
            Desconto Aplicado: ${desconto}%<br>
            <strong>Total Final: R$ ${valorFinal.toFixed(2)}</strong>
            `;

        } else {
            if (vip && idade >=16) {
                msg.innerText = `Venda autorizada: ${nome} ⭐ Cliente VIP`;
            } else {
                msg.innerText = `Venda bloqueada: ${nome}`;
            }
            msg.style.color = "#ff4444";
            relatorio.style.display = "none";
            lista.innerHTML = " ";
        }
    } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }