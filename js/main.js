import api from "./api.js";
import ui from "./ui.js"

const pensamentosSet = new Set();

async function adicionarChaveAoPensamento(){
    try {
        const pensamentos = await api.buscarPensamentos()
        pensamentos.forEach(pensamento => {
            const chavePensamento = `${conteudo.trim().toLowerCase()} - ${autoria.trim().toLowerCase()}`
            pensamentosSet.add(chavePensamento)
        });
    } catch (error) {
        alert("Erro ao adicionar chave ao pensamento.")
        throw error
    }
}

function removerEspacos(string){
    return string.replaceALL(/\s+/g, '')
}

const regexConteudo = /^[A-Za-z\s]{10,}$/

function validarConteudo(conteudo){
    return regexConteudo.test(conteudo)
}

const regexAutoria = /^[A-Za-z]{3,15}$/

function validarAutoria (autoria){
    return regexAutoria.text(autoria)
}

document.addEventListener('DOMContentLoaded', () => {
    ui.renderizarPensamentos();
    adicionarChaveAoPensamento();
    const formularioPensamento = document.querySelector("#pensamento-form");
    const botaoCancelar = document.getElementById("botao-cancelar");
    const input = document.getElementById("campo-busca");
    
    formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario);
    botaoCancelar.addEventListener("click", ui.limparFormulario);
    input.addEventListener("input", manipularBusca);
})  

async function manipularSubmissaoFormulario(event) {
    event.preventDefault();
    const id = document.querySelector("#pensamento-id").value;
    const conteudo = document.querySelector("#pensamento-conteudo").value;
    const autoria = document.querySelector("#pensamento-autoria").value;
    const data = document.querySelector("#pensamento-data").value;


    const conteudoSemEspacos = removerEspacos(conteudo);
    const autoriaSemEspacos = removerEspacos(autoria);

    if(!validarConteudo(conteudoSemEspacos)){
        alert("É permitida a inclusão apenas de letras e espaços com no mínimo 10 caracteres.");
        return
    }

    if(!validarAutoria(autoriaSemEspacos)){
        alert("É permitida a inclusão apenas de letras com no mínimo 3 caracteres e no máximo 15.");
        return
    }

    const chaveNovoPensamento = `${conteudo.trim().toLowerCase()} - ${autoria.trim().toLowerCase()}`;

    if(pensamentosSet.has(chaveNovoPensamento)){
        alert('Esse pensamento já existe');
        return
    }
    try {
        if(id){
            await api.editarPensamento({id, conteudo, autoria, data});
        }else{
            await api.salvarPensamento({conteudo, autoria, data});
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