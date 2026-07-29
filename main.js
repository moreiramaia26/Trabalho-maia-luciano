// Função para adicionar uma nova tarefa à lista com horário
function adicionarTarefa() {
    const inputTarefa = document.getElementById("tarefa");
    const inputHora = document.getElementById("horaTarefa");
    
    const textoTarefa = inputTarefa.value.trim();
    const horaTarefa = inputHora.value; // Captura o valor "HH:MM"

    // Validação para garantir que o utilizador digitou algo
    if (textoTarefa === "") {
        alert("Por favor, digite uma tarefa!");
        return;
    }

    const lista = document.getElementById("listaTarefas");

    // Cria o elemento da lista (li)
    const novoItem = document.createElement("li");
    
    // Cria o checkbox para a nova tarefa
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "check";
    // Sempre que este novo checkbox mudar, atualiza o progresso
    checkbox.addEventListener("change", atualizarProgresso);

    // Cria o texto da tarefa incluindo o horário (se houver um definido)
    const spanTexto = document.createElement("span");
    if (horaTarefa) {
        spanTexto.textContent = `[${horaTarefa}] ${textoTarefa}`;
    } else {
        spanTexto.textContent = `${textoTarefa}`;
    }

    // Cria o botão de excluir tarefa (emoji de X)
    const botaoDeletar = document.createElement("button");
    botaoDeletar.textContent = "❌";
    botaoDeletar.className = "btn-deletar";
    botaoDeletar.onclick = function() {
        novoItem.remove();
        atualizarProgresso(); // Re-calcula após eliminar
    };

    // Junta os elementos criados dentro da tag <li>
    novoItem.appendChild(checkbox);
    novoItem.appendChild(spanTexto);
    novoItem.appendChild(botaoDeletar);
    
    // Insere a nova tarefa na lista visual
    lista.appendChild(novoItem);

    // Limpa os campos de digitação para a próxima tarefa
    inputTarefa.value = "";
    inputHora.value = "";

    // Atualiza a barra de progresso porque o total de itens mudou
    atualizarProgresso();
}

// Função para calcular e atualizar o progresso geral da página
function atualizarProgresso() {
    // Procura todos os checkboxes existentes na página (dinâmicos e fixos)
    const todosCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    const total = todosCheckboxes.length;

    // Se não houver itens na página, define como zero e sai da função
    if (total === 0) {
        document.getElementById("porcentagem").textContent = "0%";
        document.getElementById("barra").value = 0;
        return;
    }

    // Conta quantos checkboxes estão marcados como concluídos
    const marcados = document.querySelectorAll('input[type="checkbox"]:checked').length;

    // Faz a conta da percentagem arredondada
    const porcentagem = Math.round((marcados / total) * 100);

    // Atualiza os valores visuais no ecrã
    document.getElementById("porcentagem").textContent = porcentagem + "%";
    document.getElementById("barra").value = porcentagem;
}

// Quando a página carregar pela primeira vez, adiciona o evento nos hábitos e checklists fixos
document.addEventListener("DOMContentLoaded", () => {
    const checkboxesIniciais = document.querySelectorAll('input[type="checkbox"]');
    checkboxesIniciais.forEach(box => {
        box.addEventListener("change", atualizarProgresso);
    });
});

