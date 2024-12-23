import api from "./api.js";

const ui = {

    async preencherFormulario(pensamentoId){
        const pensamento = await api.buscarPensamentoPorId(pensamentoId);
        document.getElementById("pensamento-id").value = pensamento.id;
        document.getElementById("pensamento-conteudo").value = pensamento.conteudo;
        document.getElementById("pensamento-autoria").value = pensamento.autoria;
        document.getElementById("pensamento-data").value = pensamento.data.toISOString().split("T")[0]
        document.getElementById("form-container").scrollIntoView();
    },

    async renderizarPensamentos (parametroRecebido = null){
        const listaPensamentos = document.getElementById("lista-pensamentos")
        let pensamentosParaRenderizar
        listaPensamentos.innerHTML = "";
        
        try {
            if (parametroRecebido){
                pensamentosParaRenderizar = parametroRecebido;
            } else {
                pensamentosParaRenderizar = await api.buscarPensamentos();
            }

            if (pensamentosParaRenderizar == ""){
                ui.listaVazia();   
            }else{
                pensamentosParaRenderizar.forEach(ui.adicionarElementoNaLista)
            }
            
        } catch {
            alert('Erro ao renderizar pensamentos');
        }
    },

    adicionarElementoNaLista(pensamento){
        const listaPensamentos = document.querySelector("#lista-pensamentos")
        const li = document.createElement("li");
        li.setAttribute("data-id", pensamento.id);
        li.classList.add("li-pensamento");

        const iconeAspas = document.createElement("img");
        iconeAspas.src = "assets/imagens/aspas-azuis.png"
        iconeAspas.alt = "Aspas azuis"
        iconeAspas.classList.add("icone-aspas");

        const divConteudo = document.createElement("div");
        divConteudo.classList.add("pensamento-conteudo");
        divConteudo.textContent = pensamento.conteudo;

        const divAutoria = document.createElement("div");
        divAutoria.classList.add("pensamento-autoria");
        divAutoria.textContent = pensamento.autoria;

        const divData = document.createElement("div");

        var options = {
            weekday:'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC'
        }

        const dataFormatada = pensamento.data.toLocaleDateString("pt-BR", options)
        const dataComRegex = dataFormatada.replace(/^(\w)/, (match) => match.toUpperCase())
        divData.classList.add("pensamento-data");
        divData.textContent = dataComRegexa;

        const botaoEditar = document.createElement("button");
        botaoEditar.classList.add("botao-editar");
        botaoEditar.onclick = () => ui.preencherFormulario(pensamento.id);

        const iconeEditar = document.createElement("img");
        iconeEditar.src = "assets/imagens/icone-editar.png";
        iconeAspas.alt = "Editar";

        botaoEditar.appendChild(iconeEditar);

        const botaoExcluir = document.createElement("button");
        botaoExcluir.classList.add("botao-excluir");
        botaoExcluir.onclick = async () => {
            try {
                await api.excluirPensamento(pensamento.id)
                ui.renderizarPensamentos
            } catch (error) {
                alert(`Erro ao excluir pensamento "${error}"`)
            }
        }

        const iconeExcluir = document.createElement("img")
        iconeExcluir.src = "assets/imagens/icone-excluir.png";
        iconeExcluir.alt = "Excluir"
        
        botaoExcluir.appendChild(iconeExcluir);

        const botaoFavorito = document.createElement("button");
        botaoFavorito.classList.add("botao-favorito");
        botaoFavorito.onclick = async () => {
            await api.atualizarFavorito(pensamento.id, !pensamento.favorito);
            ui.renderizarPensamentos();
        }

        const iconeFavorito = document.createElement("img");
        iconeFavorito.src = pensamento.favorito? "./assets/imagens/icone-favorito.png" :"./assets/imagens/icone-favorito_outline.png"

        botaoFavorito.appendChild(iconeFavorito);

        const icones = document.createElement("div");
        icones.classList.add("icones");
        icones.appendChild(botaoFavorito);
        icones.appendChild(botaoEditar);
        icones.appendChild(botaoExcluir);

        li.appendChild(iconeAspas);
        li.appendChild(divConteudo);
        li.appendChild(divAutoria);
        li.appendChild(divData);
        li.appendChild(icones);
        listaPensamentos.appendChild(li);
    },

    limparFormulario() {
      document.getElementById("pensamento-form").reset();
    },

    listaVazia(){
        const listaPensamentos = document.querySelector("#lista-pensamentos");
        const li = document.createElement("li");
        li.classList.add("lista-vazia") 

        const texto = document.createElement("h3");
        texto.textContent = "Nada por aqui ainda, que tal compartilhar alguma ideia?";

        const img = document.createElement("img");
        img.src = "./assets/imagens/lista-vazia.png";

        li.appendChild(texto);
        li.appendChild(img);
        
        listaPensamentos.appendChild(li);
    }
}

export default ui;
