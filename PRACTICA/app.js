document.addEventListener('DOMContentLoaded', () => {
    const tareaForm = document.getElementById('tareaForm');
    const nuevaTareaInput = document.getElementById('nuevaTarea');
    const listaTareas = document.getElementById('listaTareas');

    // Obtener tareas
    fetch('/api/tareas')
        .then(response => response.json())
        .then(tareas => {
            tareas.forEach(tarea => {
                agregarTareaDOM(tarea);
            });
        });

    // Manejar el envío del formulario
    tareaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const tarea = {
            id: Date.now().toString(),
            nombre: nuevaTareaInput.value
        };

        fetch('/api/tareas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tarea)
        })
        .then(response => response.json())
        .then(tarea => {
            agregarTareaDOM(tarea);
            nuevaTareaInput.value = '';
        });
    });

    // Eliminar tarea
    listaTareas.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const li = e.target.parentElement;
            const id = li.dataset.id;

            fetch(`/api/tareas/${id}`, {
                method: 'DELETE'
            })
            .then(() => {
                li.remove();
            });
        }
    });

    // Agregar tarea al DOM
    function agregarTareaDOM(tarea) {
        const li = document.createElement('li');
        li.textContent = tarea.nombre;
        li.dataset.id = tarea.id;

        const button = document.createElement('button');
        button.textContent = 'Eliminar';
        li.appendChild(button);

        listaTareas.appendChild(li);
    }
});
