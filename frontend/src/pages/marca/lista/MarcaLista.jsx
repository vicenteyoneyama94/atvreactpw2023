import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { MarcaService } from "../../../services/MarcaService";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Paginator } from "primereact/paginator";


const MarcaLista = () =>{

    const navigate = useNavigate();
	const [marca, setmarca] = useState([]);
	const marcaService = new MarcaService();
    const [idExcluir, setIdExcluir] = useState(null);
	const [dialogExcluir, setDialogExcluir] = useState(false);
	const [first, setFirst] = useState(0);
	const [rows, setRows] = useState(5);

	useEffect(() => {
		buscarmarcas();
	}, []);

    const onPageChange = (event) => {
		setFirst(event.first);
		setRows(event.rows);
	}

	const buscarmarcas = () => {
		marcaService.listar().then(data => {
			setmarca(data.data);
		})
	}
    
	const formulario = () => {
		navigate("/marca-form");
	}

	const alterar = (rowData) => {
		console.log(rowData)
		navigate("/marca-form", {state: {marcaAlterar:rowData}})
	}

    const excluir = () => {
		marcaService.excluir(idExcluir).then((data) => {
			buscarmarcas();
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
			<h2>marcas</h2>
			<button onClick={formulario}>Novo marca</button>
			<br /><br />
			<DataTable value={marca} tableStyle={{ minWidth: '50rem' }}>
				<Column field="id" header="Id"></Column>
				<Column field="nome" header="Nome"></Column>
			</DataTable>
			<Paginator
				first={first}
				rows={rows}
				totalRecords={marca.totalElements}
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

export default MarcaLista;