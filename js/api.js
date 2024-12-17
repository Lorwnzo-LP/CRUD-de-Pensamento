const url = "http://localhost:3000";

const api = {
    async buscarPensamentos() {
        try {
            const response = await axios.get(`${url}/pensamentos`);
            return await response.data;
        }
        catch{
            alert("Erro ao buscar pensamentos");
            throw error
        }
    },

    async salvarPensamento(pensamento){
        try {
            const reponse = await axios.post(`${url}/pensamentos`, pensamento)

            return await reponse.data;
        } catch  {
            alert("Erro ao salvar pensamento");
            throw error;
        }
    },

    async buscarPensamentoPorId(id) {
        try {
            const response = await axios.get(`${url}/pensamentos/${id}`)
            return await response.data;
        }
        catch{
            alert("Erro ao buscar pensamento");
            throw error
        }
    },

    async editarPensamento(pensamento){
        try {
            const reponse = await axios.put(`${url}/pensamentos/${id}`, pensamento)

            return reponse.data;
        } catch  {
            alert("Erro ao editar pensamento.");
            throw error;
        }
    },

    async excluirPensamento(id){
        try {
            const reponse = await axios.delete(`${url}/pensamentos/${id}`)
        } catch  {
            alert("Erro ao excluir pensamento.");
            throw error;
        }
    }
}

export default api;