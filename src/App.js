import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AgregarUsuario from './AgregarUsuario';
import './App.css';
import EditarUsuario from './EditarUsuario';
import ListaUsuarios from './ListaUsuarios';

function App() {
  return (
    <div className='container is-widescreen content box block has-background-dark'>

      <nav className="navbar" role="navigation" aria-label="main navigation">        
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href="/">
              Home
            </a>
            <a className="navbar-item" href="/addUser">
              Add User
            </a>            
          </div>  
        </div>  
      </nav>

      <h1 className='has-text-white has-text-centered'>MERN-Stack Aplicación de Usuarios</h1>
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ListaUsuarios/>} exact></Route>
          <Route path='/adduser' element={<AgregarUsuario/>} exact ></Route>
          <Route path='/edituser/:idusuario' element={<EditarUsuario/>} exact></Route>
        </Routes>        
      </BrowserRouter>

    </div>
  );
}

export default App;
