import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { EstadoService } from "../../../services/EstadoService";

const EstadoForm = () =>{
    const estadoNovo = { nome: ''};
	const location = useLocation();
	const { estadoAlterar } = location.state || {};
	const [estado, setestado] = useState(estadoNovo);
	const estadoService = new EstadoService();
	const navigate = useNavigate();

	useEffect(() => {
		if (estadoAlterar) {
			setestado(estadoAlterar);
		} else {
			setestado(estadoNovo)
		}
	}, []);

	const alterarValor = (event) => {
		setestado({ ...estado, [event.target.name]: event.target.value });
	}

	const salvar = () => {
		if (estado.id) {
			estadoService.alterar(estado).then(data => {
				console.log(data);
				navigate("/estados")
			});
		} else
			estadoService.inserir(estado).then(data => {
				console.log(data);
				navigate("/estados")
			});
	}

    return (
        <>

            <div style={{ padding: '10px' }}>
                <h2>Inserir um Estado e País</h2>
                <input type="text" name="nome" placeholder="Estado" value={estado.nome} onChange={alterarValor} /><br /><br />
                <input type="text" name="sigla" placeholder="Sigla" value={estado.sigla} onChange={alterarValor} /><br /><br />
                <button onClick={salvar}>Salvar</button>
            </div>
        </>

    );

}

export default EstadoForm;