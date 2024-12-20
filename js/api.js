const URL = "http://localhost:3000";

const api = {
    async buscarPensamentos() {
        try {
            const response = await axios.get(`${URL}/pensamentos`);
            return await response.data;
        }
        catch{
            alert("Erro ao buscar pensamentos");
            throw error
        }
    },

    async salvarPensamento(pensamento){
        try {
            const reponse = await axios.post(`${URL}/pensamentos`, pensamento)

            return await reponse.data;
        } catch  {
            alert("Erro ao salvar pensamento");
            throw error;
        }
    },

    async buscarPensamentoPorId(id) {
        try {
            const response = await axios.get(`${URL}/pensamentos/${id}`)
            return await response.data;
        }
        catch{
            alert("Erro ao buscar pensamento");
            throw error
        }
    },

    async editarPensamento(pensamento){
        try {
            const reponse = await axios.put(`${URL}/pensamentos/${id}`, pensamento)

            return reponse.data;
        } catch  {
            alert("Erro ao editar pensamento.");
            throw error;
        }
    },

    async excluirPensamento(id){
        try {
            const reponse = await axios.delete(`${URL}/pensamentos/${id}`)
        } catch  {
            alert("Erro ao excluir pensamento.");
            throw error;
        }
    },

    async buscarPensamentosPorTermo(termo){
        try {
            const pensamentos = await this.buscarPensamentos();
            const pensamentosFiltrados = pensamentos.filter(pensamento => {
                return pensamento.conteudo.toLowerCase().includes(termo) ||
                pensamento.autoria.toLowerCase().includes(termo)
            })

            return pensamentosFiltrados
        }
        catch{
            alert("Erro ao buscar pensamentos");
            throw error
        }
    },

    async atualizarFavorito(id, favorito){
        try {
            const pensamento = await axios.patch(`${URL}/pensamentos/${id}`, {favorito} )
            return pensamento.data;
        } catch (error) {
            alert("Erro ao atualizar pensamento.");
            throw error
        }
    }
}

export default api;