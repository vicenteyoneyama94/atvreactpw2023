import React, { useEffect, useState } from "react";
import './CategoriaLista.css';
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { CategoriaService } from "../../../services/CategoriaService";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Paginator } from "primereact/paginator";

const CategoriaLista = () => {

    const navigate = useNavigate();
	const [categoria, setCategoria] = useState([]);
	const categoriaService = new CategoriaService();
	const [idExcluir, setIdExcluir] = useState(null);
	const [dialogExcluir, setDialogExcluir] = useState(false);
	const [first, setFirst] = useState(0);
	const [rows, setRows] = useState(5);

	useEffect(() => {
		buscarCategoria();
	}, []);

	const onPageChange = (event) => {
		setFirst(event.first);
		setRows(event.rows);
	}

	const buscarCategoria = () => {
		categoriaService.listar().then(data => {
			setCategoria(data.data);
			console.log();
		})
	}

	const formulario = () => {
		navigate("/categoria-form");
	}

	const alterar = (rowData) => {
		console.log(rowData)
		navigate("/categoria-form", {state: {categoriaAlterar:rowData}})
	}

	const optionColunm = (rowData) =>{
		return (
			<>
			<Button label="Alterar" severity="warning"
			onClick= {() => alterar(rowData)} ></Button>
			</>
		)
	}

    return(
        <div className="container">
			<h2>Categorias</h2>
			<button onClick={formulario}>Nova Categoria</button>
			<br /><br />
			<DataTable value={categoria} tableStyle={{ minWidth: '50rem' }}>
				<Column field="id" header="Id"></Column>
				<Column field="nome" header="Nome"></Column>
			</DataTable>
			<Paginator
				first={first}
				rows={rows}
				totalRecords={categoria.totalElements}
				rowsPerPageOptions={[5, 10, 20, 30]}
				onPageChange={onPageChange}
			/>

			<ConfirmDialog
				visible={dialogExcluir}
				onHide={() => setDialogExcluir(false)}
				message="Deseja excluir?"
				header="Confirmação"
				icon="pi pi-exclamation-triangle"
				accept={categoria.idExcluir}
				reject={() => setIdExcluir(null)}
				acceptLabel="Sim"
				rejectLabel="Não"
			/>
            </div>
    );

}
export default CategoriaLista;