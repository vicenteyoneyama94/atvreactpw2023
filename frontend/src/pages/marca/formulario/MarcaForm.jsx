import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { MarcaService } from "../../../services/MarcaService";

const MarcaForm = () => {

    const marcaNovo = { nome: '' };
    const location = useLocation();
    const { marcaAlterar } = location.state || {};
    const [marca, setmarca] = useState(marcaNovo);
    const marcaService = new MarcaService();
    const navigate = useNavigate();

    useEffect(() => {
        if (marcaAlterar) {
            setmarca(marcaAlterar);
        } else {
            setmarca(marcaNovo)
        }
    }, []);

    const alterarValor = (event) => {
        setmarca({ ...marca, [event.target.name]: event.target.value });
    }

    const salvar = () => {
        if (marca.id) {
            marcaService.alterar(marca).then(data => {
                console.log(data);
                navigate("/marcas")
            });
        } else
            marcaService.inserir(marca).then(data => {
                console.log(data);
                navigate("/marcas")
            });
    }

    return (
        <>

            <div style={{ padding: '10px' }}>
                <h2>Inserir uma marca</h2>
                <input type="text" name="nome" placeholder="marca" value={marca.nome} onChange={alterarValor} /><br /><br />
                <button onClick={salvar}>Salvar</button>
            </div>
        </>
    );
}

export default MarcaForm;