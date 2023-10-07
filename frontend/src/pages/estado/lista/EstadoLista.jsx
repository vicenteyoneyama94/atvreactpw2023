import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { EstadoService } from "../../../services/EstadoService";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Paginator } from "primereact/paginator";

const EstadoLista = () =>{

    const navigate = useNavigate();
	const [estado, setEstado] = useState([]);
	const estadoService = new EstadoService();
    const [idExcluir, setIdExcluir] = useState(null);
	const [dialogExcluir, setDialogExcluir] = useState(false);
	const [first, setFirst] = useState(0);
	const [rows, setRows] = useState(5);

	useEffect(() => {
		buscarEstados();
	}, []);

    const onPageChange = (event) => {
		setFirst(event.first);
		setRows(event.rows);
	}

	const buscarEstados = () => {
		estadoService.listar().then(data => {
			setEstado(data.data);
		})
	}
    
	const formulario = () => {
		navigate("/estado-form");
	}

	const alterar = (rowData) => {
		console.log(rowData)
		navigate("/estado-form", {state: {estadoAlterar:rowData}})
	}

    const excluir = () => {
		estadoService.excluir(idExcluir).then((data) => {
			buscarEstados();
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
			<h2>Estados</h2>
			<button onClick={formulario}>Novo Estado</button>
			<br /><br />
			<DataTable value={estado} tableStyle={{ minWidth: '50rem' }}>
				<Column field="id" header="Id"></Column>
				<Column field="nome" header="Nome"></Column>
                <Column field="sigla" header="Sigla"></Column>
			</DataTable>
			<Paginator
				first={first}
				rows={rows}
				totalRecords={estado.totalElements}
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

export default EstadoLista;