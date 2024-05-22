//Importar el modulo 'http' para crear un servidor HTTP
const http = require('http');

//Importar el modulo 'fs' para leer el archivo
const fs = require('fs');
//Crear un servidor HTTP
const servidor = http.createServer((req, res)=>{
    console.log('Solicitud recibida'); //Imprimir un mensaje en la consola cuando se reciba una solicitud

    //Leer el contenido del archivo 'mensaje.txt'
    fs.readFile('mensaje.txt', (err, data) => {
        if (err) {//Verificar si ocurrio un error al leer el archivo
            //Enviar una respuesta de error si ocurrio un error al leer el archivo
            res.writeHead(500, {'Content-Type': 'text/plain'});
            //Configurar el encabezado de la respuesta con el codigo de estado 500 (Error interno del servidor)
            res.end('Error al leer el archivo');
            //Enviar el mensaje de error como cuerpo de la respuesta
            console.error('Error al leer el archivo:', err);//Imprimir el error en la consola
        } else {
            //Enviar el contenido del archivo como respuesta HTTP si no ocurrio ningun error
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            //Configurar el encabeza de la cabezado de la respuesta con el codigo de esatdo 200 (Exito) y el tipo de contenido 'text/plain'
            res.end(data); //Enviar el contenido del archivo como cuerpo de la respuesta
        }
    });
});
//Iniciar el servidor y escuchar en el puerto 8080
servidor.listen(8080, () => {
    console.log('Servidor HTTP escuchando en el puerto 8080');
    //Imprimir un mensaje en la console cuando el servidor empiece a escuchar en el puerto 8080
});