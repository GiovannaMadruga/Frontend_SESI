function executarSistemas() {
    try {
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
        const cadastro = inputCadastro.value === "true"; 

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

    // Guarda quantas vezes cada cliente comprou
let clientes = JSON.parse(localStorage.getItem("clientes")) || {};

function executarSistemas() {
    const nome = document.getElementById("inputNome").value.trim();
    const idade = document.getElementById("inputIdade").value;
    const valor = parseFloat(document.getElementById("inputValor").value);
    const cupom = document.getElementById("inputCupom").value === "true";

    const relatorio = document.getElementById("relatorio-final");
    const mensagem = document.getElementById("mensagem-autorizacao");

    if (!nome || !idade || !valor) {
        mensagem.textContent = "Preencha todos os campos!";
        return;
    }
    if (idade < 16) {
        mensagem.textContent = `Venda bloqueada: ${nome}`;
        mensagem.style.color = "#ff4444";
        relatorio.style.display = "none";
        return;
    }

    // Conta as compras do cliente
    if (clientes[nome]) {
        clientes[nome]++;
    } else {
        clientes[nome] = 1;
    }

    // Salva no navegador
    localStorage.setItem("clientes", JSON.stringify(clientes));

    // VIP a partir da segunda compra
    let vip = clientes[nome] >= 2;

    // Calcula desconto
    let desconto = 0;

    if (cupom) {
        desconto += valor * 0.15;
    }

    if (vip) {
        desconto += valor * 0.10;
    }

    const valorFinal = valor - desconto;

    relatorio.style.display = "block";
    relatorio.innerHTML = `
        <h3>Relatório da Venda</h3>
        <p><strong>Cliente:</strong> ${nome}</p>
        <p><strong>Compras registradas:</strong> ${clientes[nome]}</p>
        <p><strong>Status:</strong> ${vip ? "⭐ Cliente VIP" : "Cliente Comum"}</p>
        <p><strong>Valor Original:</strong> R$ ${valor.toFixed(2)}</p>
        <p><strong>Desconto:</strong> R$ ${desconto.toFixed(2)}</p>
        <p><strong>Valor Final:</strong> R$ ${valorFinal.toFixed(2)}</p>
        <p><strong>Venda finalizada com sucesso!<strong></p>
    `;
}
function verificarCadastro() {
    const cadastro = document.getElementById("inputCadastro").value;

    if (cadastro === "nao") {
        document.getElementById("novoCadastro").style.display = "block";
    } else {
        document.getElementById("novoCadastro").style.display = "none";
        document.getElementById("dadosCadastro").style.display = "none";
    }
}

function mostrarCamposCadastro() {
    const resposta = document.getElementById("desejaCadastrar").value;

    if (resposta === "sim") {
        document.getElementById("dadosCadastro").style.display = "block";
    } else {
        document.getElementById("dadosCadastro").style.display = "none";
    }
}