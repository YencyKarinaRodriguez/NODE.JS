const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para obtener todas las tareas
app.get('/api/tareas', (req, res) => {
    fs.readFile('tareas.json', (err, data) => {
        if (err) throw err;
        const tareas = JSON.parse(data);
        res.json(tareas);
    });
});

// Ruta para agregar una nueva tarea
app.post('/api/tareas', (req, res) => {
    const nuevaTarea = req.body;
    fs.readFile('tareas.json', (err, data) => {
        if (err) throw err;
        const tareas = JSON.parse(data);
        tareas.push(nuevaTarea);
        fs.writeFile('tareas.json', JSON.stringify(tareas), (err) => {
            if (err) throw err;
            res.json(nuevaTarea);
        });
    });
});

// Ruta para eliminar una tarea
app.delete('/api/tareas/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('tareas.json', (err, data) => {
        if (err) throw err;
        let tareas = JSON.parse(data);
        tareas = tareas.filter(tarea => tarea.id !== id);
        fs.writeFile('tareas.json', JSON.stringify(tareas), (err) => {
            if (err) throw err;
            res.json({ message: 'Tarea eliminada' });
        });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
