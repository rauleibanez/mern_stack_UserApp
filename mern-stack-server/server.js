const express = require('express')
const cors = require('cors');

const app = express()

app.use(cors());

//importar conexion a MongoDB
const archivoBD = require('./conexion');

//importar Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:'true'}));

//importar rutas y modelo usuario
const rutausuario = require('./rutas/usuario');
app.use('/api/usuario', rutausuario);

//endpoint por defecto
app.get('/', (req, res) => { 
  res.end('Bievenido al servidor Back-End! aplicación de Usuarios MERN-STACK!...')
});

//Configuracion server Basico
app.listen(5000, function(){
  console.log('El servidor esta corriendo en el puerto 5000');
});
