//Importar el modulo 'http' para crear un cliente HTTP
const http = require('http');

//Opciones de conexion al servidor HTTP
const opciones = {
    hostname: 'localhost', //Nombre del host del servidor al que nos conectamos
    port: 8080, //Puerto del servidor al que nos conectaremos
    path: '/', //Ruta en el servidor a la que haremos la solicitud
    method: 'GET' //Metodo de solicitud que utilizaremos (en esto caso, una solicitud GET)
};

//Realizar una solicitud HTTP GET al servidor
const solicitud = http.request(opciones, (res) => {
    let datos = ''; //Variable para almacenar los datos recibidos del servidor

    //Almacenar los datos recibidos en una cadena buffer de datos
    res.on('data', (chunk) => {
        datos += chunk; // Agregar los datos recibidos al final de la cadena
    });

    //Cuando se completa la recepcion ded datos, mostrarlos en la consola
    res.on('end', () => {
        console.log('Mensaje recibido del servidor:', datos); //Mostrar los datos recibidos en la consola
    });
});

// Manejar errores en la solictud
solicitud.on('error', (err) => {
    console.error('Error en la solicitud:', err); //Mostrar errores de solicitud en la console
});

//Finalizar la solicitud
solicitud.end();//Indicar que hemos terminado de configurar la solicitud y enviarla al servidor
