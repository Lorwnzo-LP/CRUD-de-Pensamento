import api from "./api.js";
import ui from "./ui.js"

const formId = document.querySelector("#pensamento-id");
const formConteudo = document.querySelector("#pensamento-conteudo");
const formAutoria = document.querySelector("#pensamento-autoria");
const botaoCancelar = document.querySelector("#botao-cancelar");

document.addEventListener('DOMContentLoaded', () => {
        ui.renderizarPensamentos();


    const formularioPensamento = document.querySelector("#pensamento-form");
    formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario)
})  

botaoCancelar.addEventListener("click", ui.limparFormulario
)
async function manipularSubmissaoFormulario(event) {
    event.preventDefault();
    const id = formId.value;
    const conteudo = formConteudo.value;
    const autoria = formAutoria.value;

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


