import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EditarUsuario() {
    const navigate = useNavigate();
    const params = useParams();
    // Hooks
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:5000/api/usuario/obtenerusuario/${params.idusuario}`)
        .then(res => {
            const usuario = res.data;
            setNombre(usuario.nombre);
            setEmail(usuario.email);
            setTelefono(usuario.telefono);
        })
        .catch(err => {
            console.log(err);
        });
    }, [params.idusuario]);

    function guardausuario() {
        const usuarioActualizado = {
            nombre: nombre,
            email: email,
            telefono: telefono
        };

        axios.put(`http://localhost:5000/api/usuario/actualizarusuario/${params.idusuario}`, usuarioActualizado)
        .then(res => {
            alert(res.data);
            navigate('/');
        })
        .catch(err => {
            console.log(err);
        });
    }


    function limpiarCampos() {
        setNombre("");
        setEmail("");
        setTelefono("");
    }

    return (
        <div className="content box">
            <h2>Editar Usuarios</h2>

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
                    <button onClick={guardausuario} className="button is-link">Submit</button>
                </div>
                <div className="control">
                    <button onClick={limpiarCampos} className="button is-link is-light">Cancel</button>
                </div>
            </div>
        </div>
    );
}
