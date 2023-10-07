import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './CategoriaForm.css';
import { CategoriaService } from "../../../services/CategoriaService";

const CategoriaForm = () => {

    const categoriaNovo = { nome: ''};
	const location = useLocation();
	const { categoriaAlterar } = location.state || {};
	const [categoria, setCategoria] = useState(categoriaNovo);
	const categoriaService = new CategoriaService();
	const navigate = useNavigate();

	useEffect(() => {
		if (categoriaAlterar) {
			setCategoria(categoriaAlterar);
		} else {
			setCategoria(categoriaNovo)
		}
	}, []);

	const alterarValor = (event) => {
		setCategoria({ ...categoria, [event.target.name]: event.target.name });
	}

	const salvar = () => {
		if (categoria.id) {
			categoriaService.alterar(categoria).then(data => {
				console.log(data);
				navigate("/categorias")
			});
		} else
			categoriaService.inserir(categoria).then(data => {
				console.log(data);
				navigate("/categorias")
			});
	}

    return (
        <>

            <div style={{ padding: '10px' }}>
                <h2>Inserir uma Categoria</h2>
                <input type="text" name="nome" value={categoria.descricao} onChange={alterarValor} /><br /><br />
                <button onClick={salvar}>Salvar</button>
            </div>

        </>
    );

}
export default CategoriaForm;