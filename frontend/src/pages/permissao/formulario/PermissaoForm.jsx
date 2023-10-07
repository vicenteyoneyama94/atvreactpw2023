import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { PermissaoService } from "../../../services/PermissaoService";

const PermissaoForm = () => {
    const permissaoNovo = { nome: ''};
	const location = useLocation();
	const { permissaoAlterar } = location.state || {};
	const [permissao, setpermissao] = useState(permissaoNovo);
	const permissaoService = new PermissaoService();
	const navigate = useNavigate();

	useEffect(() => {
		if (permissaoAlterar) {
			setpermissao(permissaoAlterar);
		} else {
			setpermissao(permissaoNovo)
		}
	}, []);

	const alterarValor = (event) => {
		setpermissao({ ...permissao, [event.target.name]: event.target.value });
	}

	const salvar = () => {
		if (permissao.id) {
			permissaoService.alterar(permissao).then(data => {
				console.log(data);
				navigate("/permissao")
			});
		} else
			permissaoService.inserir(permissao).then(data => {
				console.log(data);
				navigate("/permissao")
			});
	}

    return (
        <>

            <div style={{ padding: '10px' }}>
                <h2>Inserir a permissao</h2>
                <input type="text" name="nome" placeholder="permissao" value={permissao.nome} onChange={alterarValor} /><br /><br />
                <button onClick={salvar}>Salvar</button>
            </div>
        </>

    );
}

export default PermissaoForm;