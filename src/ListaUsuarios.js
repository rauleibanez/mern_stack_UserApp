import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ListaUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/api/usuario/obtenerusuarios')
        .then(res => {
            setUsuarios(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
    }, []);

    const eliminarUsuario = (idusuario) => {
      axios.delete(`/api/usuario/eliminarusuario/${idusuario}`)
      .then(res => {
          alert(res.data);
          setUsuarios(usuarios.filter(usuario => usuario.idusuario !== idusuario));
      })
      .catch(err => {
          console.log(err);
      });
    };

    const editarUsuario = (idusuario) => {
      // Aquí iría la lógica para editar un usuario
      console.log("Editando usuario con ID:", idusuario);
    };
    
    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h2>Lista de Usuarios</h2>
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.idusuario}>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.telefono}</td>
                            <td>
                                <button onClick={() => editarUsuario(usuario.idusuario)} className="button is-small is-info">Editar</button>
                                <button onClick={() => eliminarUsuario(usuario.idusuario)} className="button is-small is-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}