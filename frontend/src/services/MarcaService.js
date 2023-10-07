import axios from "axios";

export class MarcaService{
	URL = "http://localhost:8080/marcas";

	inserir(categoria){
		return axios.post(this.URL, categoria);
	}

	alterar(categoria){
		return axios.put(this.URL, categoria);
	}

	excluir(id){
		return axios.delete(this.URL, id);
	}

	listar(){
		return axios.get(this.URL);
	}
}