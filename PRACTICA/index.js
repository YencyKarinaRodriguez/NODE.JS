// index.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const tareasPath = path.join(__dirname, 'tareas.json');

// Middleware para servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Ruta para obtener todas las tareas
app.get('/api/tareas', (req, res) => {
    fs.readFile(tareasPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'No se pudo leer el archivo de tareas' });
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// Ruta para agregar una nueva tarea
app.post('/api/tareas', (req, res) => {
    const nuevaTarea = req.body;
    fs.readFile(tareasPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'No se pudo leer el archivo de tareas' });
        } else {
            const tareas = JSON.parse(data);
            tareas.push(nuevaTarea);
            fs.writeFile(tareasPath, JSON.stringify(tareas, null, 2), (err) => {
                if (err) {
                    res.status(500).json({ error: 'No se pudo escribir en el archivo de tareas' });
                } else {
                    res.status(201).json(nuevaTarea);
                }
            });
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
