   // Importamos las funciones necesarias desde utils.js
   import { getTasks, insertTask, deleteTask, mostrarFormularioEditar, updateTask } from './utils.js';

   // Cargar todas las tareas cuando la página se cargue
   await getTasks();
   
   // Capturar el formulario de creación de tareas
   const form = document.getElementById("task-form");
   form.addEventListener("submit", e => {
       e.preventDefault();
       const trabajo = {
           title: form["task-title"].value,
           description: form["task-description"].value
       };
       insertTask(trabajo);
   });
   
   // Capturar el formulario de actualización de tareas
   const formActualizar = document.getElementById("formActualizarTarea");
   formActualizar.addEventListener("submit", e => {
       e.preventDefault();
       const id = formActualizar.getAttribute("data-id");  // Recuperamos el id de la tarea que estamos editando
       const updatedTask = {
           title: document.getElementById("task-titles").value,
           description: document.getElementById("task-descriptions").value
       };
   
       console.log("Datos actualizados:", updatedTask);
       updateTask(id, updatedTask);  // Llamamos a la función que actualiza la tarea en la base de datos
   
       // Después de actualizar, ocultamos el formulario de edición
       document.getElementById("contenedorActualizar").style.display = "none";
   });
   