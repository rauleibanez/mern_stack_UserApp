import { useState } from "react";
import uniqid from "uniqid";
import axios from "axios";

export default function AgregarUsuario(){
    //Hooks
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");

    function agregausuario(){
      
      let usuario = {
        nombre: nombre,
        email:email,
        telefono: telefono,
        idusuario: uniqid()
      }

      console.log(usuario);
      
      axios.post("http://localhost:5000/api/usuario/agregarusuario", usuario)
      .then(res => {
        alert(res.data);
        limpiarCampos();
      })
      .then(err => {console.log(err)})
      }

    function limpiarCampos() {
      setNombre("");
      setEmail("");
      setTelefono("");
    }

    return (
    <div className="content box">
      <h2>Crea un nuevo Usuario</h2>
      
      <div className="field">
        <label className="label">Nombre</label>
        <div className="control">
          <input className="input" type="text" placeholder="Nombre" value={nombre} onChange={(e) => {setNombre(e.target.value)}} />
        </div>
      </div>

      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input className="input" type="email" placeholder="E-mail" value={email} onChange={(e) => {setEmail(e.target.value)}} />
        </div>        
      </div>

      <div className="field">
        <label className="label">Telefono</label>
        <div className="control">
          <input className="input" type="text" placeholder="Telefono" value={telefono} onChange={(e) => {setTelefono(e.target.value)}} />
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button onClick={agregausuario} className="button is-link">Submit</button>
        </div>
        <div className="control">
          <button onClick={limpiarCampos} className="button is-link is-light">Cancel</button>
        </div>
      </div>

    </div>    
    );  
  }