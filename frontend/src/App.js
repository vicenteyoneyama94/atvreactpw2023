import React, { createContext, useState } from 'react';
import './App.css';
import Menu from './components/menu/Menu';
import Home from './pages/home/Home';
import Rodape from './components/rodape/Rodape';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProdutoLista from './pages/produto/lista/ProdutoLista';
import ProdutoFormulario from './pages/produto/formulario/ProdutoFormulario';
import CategoriaLista from './pages/categoria/lista/CategoriaLista';
import CategoriaForm from './pages/categoria/formulario/CategoriaForm';
import EstadoForm from './pages/estado/formulario/EstadoForm';
import EstadoLista from './pages/estado/lista/EstadoLista';
import MarcaLista from './pages/marca/lista/MarcaLista';
import MarcaForm from './pages/marca/formulario/MarcaForm';
import PermissaoLista from './pages/permissao/lista/PermissaoLista';
import PermissaoForm from './pages/permissao/formulario/PermissaoForm';

export const TemaContexto = createContext();

function App() {
	const [dark, setDark] = useState(true);

	return (
		<div className="App">

			<TemaContexto.Provider value={{dark, setDark}}>
				<BrowserRouter>
					<Menu />
					<Routes>
						<Route exact path='/' Component={() => <Home />} />
						<Route path='/produtos' Component={ProdutoLista}/>
						<Route path='/produto-formulario' Component={ProdutoFormulario}/>
						<Route path='/categorias' Component={CategoriaLista}/>
						<Route path='/categoria-form' Component={CategoriaForm}/>
						<Route path='/estados' Component={EstadoLista}/>
						<Route path='/estado-form' Component={EstadoForm}/>
						<Route path='/marcas' Component={MarcaLista}/>
						<Route path='/marca-form' Component={MarcaForm}/>
						<Route path='/permissao' Component={PermissaoLista}/>
						<Route path='/permissao-form' Component={PermissaoForm}/>


					</Routes>
					<Rodape />
				</BrowserRouter>
			</TemaContexto.Provider>
		</div>
	);
}

export default App;
