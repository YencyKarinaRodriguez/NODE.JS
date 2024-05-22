//Importar Express.js
const express = require('express');
//Crear una aplicacion Express
const app = express();
//Definir el puerto en el que se ejecutara el servidor
const puerto = 3000;

//Ruta raiz
app.get('/', (req, res) => {
    //Responder con mensaje de saludo
    res.send('¡Hola, mundo desde Express.js!');
});

//Ruta de ejemplo con parametros
app.get('/saludo/:nombre', (req, res) => {
    //Obtener el parametro 'nombre' de la URL
    const nombre = req.params.nombre;
    //Responder con un mensaje personalizado usando el parametro
    res.send(`¡Hola, ${nombre}`);
});

//Manejador de errores para rutas no encontradas
app.use((req, res, next) => {
    //Responder con un mensaje de error y un codigo de estado 404
    res.status(404).send('Ruta no encontrada');
});

//Iniciar el servidor y escuchar en el puerto especificado
app.listen(puerto, () => {
    //Imprimir un mensaje en la consola cuando el servidor se inicia correctamente
    console.log(`Servidor Express.js escuchando en el pueto ${puerto}`);
});