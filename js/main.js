import api from "./api.js";
import ui from "./ui.js"

document.addEventListener('DOMContentLoaded', () => {
    ui.renderizarPensamentos();

    const formularioPensamento = document.querySelector("#pensamento-form");
    const botaoCancelar = document.getElementById("botao-cancelar")
    const input = document.getElementById("campo-busca");
    
    formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario);
    botaoCancelar.addEventListener("click", ui.limparFormulario)
    input.addEventListener("input", manipularBusca)
})  

async function manipularSubmissaoFormulario(event) {
    event.preventDefault();
    const id = document.querySelector("#pensamento-id").value;
    const conteudo = document.querySelector("#pensamento-conteudo").value;
    const autoria = document.querySelector("#pensamento-autoria").value;
    try {
        if(id){
            await api.editarPensamento({id, conteudo, autoria});
        }else{
            await api.salvarPensamento({conteudo, autoria});
            ui.renderizarPensamentos();
        }
    } catch  (error){
        alert("erro ao submitar");
    }
}

async function manipularBusca() {
    const termoValue = document.getElementById("campo-busca").value;
    try {
        const pensamentosFiltrados = await api.buscarPensamentosPorTermo(termoValue);
        console.log(pensamentosFiltrados);
        ui.renderizarPensamentos(pensamentosFiltrados);
    } catch (error) {
        alert("erro ao buscar pensamentos")
        throw error
    }
}


