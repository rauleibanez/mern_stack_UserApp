const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const eschema = mongoose.Schema;

const eschemausuario = new eschema({
  nombre: String,
  email: String,
  telefono: String,
  idusuario: String
});

const ModeloUsuario = mongoose.model('usuarios', eschemausuario);
module.exports = router

// Ruta de Prueba
router.get('/test', (req, res) => {
  res.end('OK! desde la ruta /test!...');
});

//Ruta para agregar datos
router.post('/agregarusuario', async (req, res) => {
    try {
        const nuevousuario = new ModeloUsuario({
            nombre: req.body.nombre,
            email: req.body.email,
            telefono: req.body.telefono,
            idusuario: req.body.idusuario    
        });
        await nuevousuario.save();
        res.send('Usuario Agregado con Exito!');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Ruta para obtener todos los usuarios
router.get('/obtenerusuarios', async (req, res) => {
  try {
    const usuarios = await ModeloUsuario.find({});
    res.json(usuarios);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Ruta para obtener un usuario por id
router.get('/obtenerusuario/:idusuario', async (req, res) => {
  try {
    const usuario = await ModeloUsuario.findOne({ idusuario: req.params.idusuario });
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});


// Ruta para actualizar un usuario
router.put('/actualizarusuario/:idusuario', async (req, res) => {
  try {
    const usuarioActualizado = await ModeloUsuario.findOneAndUpdate(
      { idusuario: req.params.idusuario },
      req.body,
      { new: true }
    );

    if (usuarioActualizado) {
      res.send('Usuario actualizado con éxito');
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Ruta para eliminar un usuario por id
router.delete('/eliminarusuario/:idusuario', async (req, res) => {
  try {
    const resultado = await ModeloUsuario.findOneAndDelete({ idusuario: req.params.idusuario });
    if (resultado) {
      res.send('Usuario eliminado con éxito');
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
