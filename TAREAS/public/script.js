// public/script.js
document.addEventListener('DOMContentLoaded', () => {
    const tareasLista = document.getElementById('tareas-lista');
    const nuevaTareaInput = document.getElementById('nueva-tarea');
    const agregarTareaBtn = document.getElementById('agregar-tarea');

    // Función para cargar las tareas
    const cargarTareas = () => {
        fetch('/api/tareas')
            .then(response => response.json())
            .then(tareas => {
                tareasLista.innerHTML = '';
                tareas.forEach(tarea => {
                    const li = document.createElement('li');
                    li.textContent = tarea.descripcion;
                    tareasLista.appendChild(li);
                });
            })
            .catch(error => console.error('Error al cargar tareas:', error));
    };

    // Función para agregar una nueva tarea
    const agregarTarea = () => {
        const descripcion = nuevaTareaInput.value.trim();
        if (descripcion) {
            fetch('/api/tareas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ descripcion }),
            })
                .then(response => response.json())
                .then(tarea => {
                    const li = document.createElement('li');
                    li.textContent = tarea.descripcion;
                    tareasLista.appendChild(li);
                    nuevaTareaInput.value = '';
                })
                .catch(error => console.error('Error al agregar tarea:', error));
        }
    };

    // Evento para agregar tarea al hacer clic en el botón
    agregarTareaBtn.addEventListener('click', agregarTarea);

    // Cargar tareas al cargar la página
    cargarTareas();
});
