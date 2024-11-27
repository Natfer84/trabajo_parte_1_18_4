// Importamos las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBEWCLoBsUswfMd1nembSXfMNneFOACfwI",
    authDomain: "ejercicio1---tareas.firebaseapp.com",
    projectId: "ejercicio1---tareas",
    storageBucket: "ejercicio1---tareas.firebasestorage.app",
    messagingSenderId: "428046358801",
    appId: "1:428046358801:web:e7bbf776c919242f7b14b0"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para obtener las tareas desde Firestore
export async function getTasks() {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
        createCard(doc.id, doc.data());
    });
}

// Función para crear una tarjeta de tarea
function createCard(id, task) {
    const principalDiv = document.createElement('div');
    principalDiv.setAttribute("class", "card bg-light mb-3");
    principalDiv.style = "max-width: 20rem;";
    principalDiv.setAttribute("name", id);

    const headerDiv = document.createElement('div');
    const contentDiv = document.createTextNode("Id: " + id);
    headerDiv.setAttribute("class", "card-header");
    headerDiv.appendChild(contentDiv);
    principalDiv.appendChild(headerDiv);

    const bodyDiv = document.createElement('div');
    const pTitle = document.createElement("p");
    const pTitleText = document.createTextNode("Title: " + task.title);
    const hr = document.createElement('hr');
    const pDesc = document.createElement("p");
    const pDescText = document.createTextNode("Description: " + task.description);

    pTitle.appendChild(pTitleText);
    bodyDiv.appendChild(pTitle);
    bodyDiv.appendChild(hr);
    pDesc.appendChild(pDescText);
    bodyDiv.appendChild(pDesc);
    bodyDiv.appendChild(hr);

    // Botón de eliminar tarea
    const inputDelete = document.createElement("input");
    inputDelete.type = "button";
    inputDelete.value = "Borrar Tarea";
    inputDelete.setAttribute("name", "delete");
    inputDelete.setAttribute("id", id);
    bodyDiv.appendChild(inputDelete);

    // Botón de actualizar tarea
    const inputUpdate = document.createElement("input");
    inputUpdate.type = "button";
    inputUpdate.value = "Actualizar Tarea";
    inputUpdate.setAttribute("name", "update");
    inputUpdate.setAttribute("id", id);
    bodyDiv.appendChild(inputUpdate);

    principalDiv.appendChild(bodyDiv);
    document.getElementById("task-container").appendChild(principalDiv);

    // Agregar eventos para los botones
    inputDelete.addEventListener("click", () => deleteTask(id));
    inputUpdate.addEventListener("click", () => showEditForm(id, task.title, task.description));
}

// Función para insertar una nueva tarea en Firestore
export async function insertTask(task) {
    const taskId = generateRandomIdTask(20);
    await setDoc(doc(db, "tasks", taskId), task);
    alert("Insertada la tarea: " + task.title);
}

// Función para eliminar una tarea de Firestore
export async function deleteTask(id) {
    await deleteDoc(doc(db, "tasks", id));
    alert("Borrada la tarea: " + id);
    // Eliminar la tarea del DOM también
    const taskDiv = document.querySelector(`div[name='${id}']`);
    taskDiv.remove();
}

// Función para generar un ID aleatorio
function generateRandomIdTask(num) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// Función para mostrar el formulario de edición
function showEditForm(id, currentTitle, currentDescription) {
    const editForm = document.getElementById("edit-form");//div
    const formTitle = document.getElementById("edit-task-title");//input del titulo
    const formDesc = document.getElementById("edit-task-description"); //text area de la descripcion.

    formTitle.value = currentTitle; // Titulo actual
    formDesc.value = currentDescription; // Descripcion actual

    editForm.style.display = "block"; //HAcemos visible el fomulario de actualizacion

    // Capturamos el evento de submit del formulario de edición
    const editFormSubmit = document.getElementById("edit-task-form");// COge los datos del formulario
    editFormSubmit.onsubmit = async (e) => {
        e.preventDefault(); //Evita enviar el formulario, hasta que este completo

        //Aqui tenemos una constante con los valores ya actualizados
        const updatedTask = {
            title: formTitle.value,//Con value, cogemos su valor
            description: formDesc.value
        };

        // Actualizamos la tarea en Firestore
        await updateTask(id, updatedTask);
        
        // Actualizamos la vista en el DOM
        const taskCard = document.querySelector(`div[name='${id}']`);
        taskCard.querySelector("p").innerText = "Title: " + updatedTask.title;
        taskCard.querySelectorAll("p")[1].innerText = "Description: " + updatedTask.description;

        // Ocultamos el formulario de edición
        editForm.style.display = "none";
    };
}

// Función para actualizar una tarea en Firestore
async function updateTask(id, task) {
    const taskRef = doc(db, "tasks", id);
    await updateDoc(taskRef, task);
    alert("Tarea actualizada: " + task.title);
}

// Capturar el submit del formulario de nueva tarea
const form = document.getElementById("task-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = {
        title: form["task-title"].value,
        description: form["task-description"].value
    };

    insertTask(task);
});

// Inicializar la carga de tareas
await getTasks();
