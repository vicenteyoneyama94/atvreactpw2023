import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { PermissaoService } from "../../../services/PermissaoService";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Paginator } from "primereact/paginator";

const PermissaoLista = () =>{

    const navigate = useNavigate();
	const [permissao, setpermissao] = useState([]);
	const permissaoService = new PermissaoService();
    const [idExcluir, setIdExcluir] = useState(null);
	const [dialogExcluir, setDialogExcluir] = useState(false);
	const [first, setFirst] = useState(0);
	const [rows, setRows] = useState(5);

	useEffect(() => {
		buscarPermissao();
	}, []);

    const onPageChange = (event) => {
		setFirst(event.first);
		setRows(event.rows);
	}

	const buscarPermissao = () => {
		permissaoService.listar().then(data => {
			setpermissao(data.data);
		})
	}
    
	const formulario = () => {
		navigate("/permissao-form");
	}

	const alterar = (rowData) => {
		console.log(rowData)
		navigate("/permissao-form", {state: {permissaoAlterar:rowData}})
	}

    const excluir = () => {
		permissaoService.excluir(idExcluir).then((data) => {
			buscarPermissao();
		});
	};

	const optionColunm = (rowData) =>{
		return (
			<>
			<Button label="Alterar" severity="warning"
			onClick= {() => alterar(rowData)}
            />
            <Button
					label="Excluir"
					severity="dander"
					onClick={() => {
						setIdExcluir(rowData.id);
						setDialogExcluir(true);
					}}
				/>
			</>
		)
	}

    return(
        <div className="container">
			<h2>Permissão</h2>
			<button onClick={formulario}>Nova Permissão</button>
			<br /><br />
			<DataTable value={permissao} tableStyle={{ minWidth: '50rem' }}>
				<Column field="id" header="Id"></Column>
				<Column field="nome" header="Nome"></Column>
			</DataTable>
			<Paginator
				first={first}
				rows={rows}
				totalRecords={permissao.totalElements}
				rowsPerPageOptions={[5, 10, 20, 30]}
				onPageChange={onPageChange}
			/>

			<ConfirmDialog
				visible={dialogExcluir}
				onHide={() => setDialogExcluir(false)}
				message="Deseja excluir?"
				header="Confirmação"
				icon="pi pi-exclamation-triangle"
				accept={excluir}
				reject={() => setIdExcluir(null)}
				acceptLabel="Sim"
				rejectLabel="Não"
			/>
            </div>
    );
}

export default PermissaoLista;